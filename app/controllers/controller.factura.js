const db = require('../config/db.config.js'); // Asume que tienes una carpeta models con Factura y DetalleFactura
const Factura = db.Factura;
const DetalleFactura = db.DetalleFactura;

const realizarCompra = async (req, res) => {
  // Log para verificar el cuerpo de la solicitud
  console.log('Datos recibidos:', req.body);

  const { idCliente, idEmpleado, idSucursal, productos, total, correo } = req.body;

  // Validar que los datos requeridos están presentes
  if (!idCliente || !idEmpleado || !idSucursal || !productos || productos.length === 0 || !total || !correo) {
    return res.status(400).json({ message: 'Datos incompletos en la solicitud' });
  }

  // Inicia una transacción para asegurar que las inserciones sean atómicas
  const transaction = await db.sequelize.transaction();

  try {
    // Crear la Factura
    const factura = await Factura.create({
      serieFactura: 'A001', // Genera esto dinámicamente si lo necesitas
      fechaFactura: new Date(),
      idCliente,
      idEmpleado,
      idSucursal,
      total,
      correo
    }, { transaction });

    // Verificación de productos antes de insertarlos
    for (let producto of productos) {
      if (!producto.idAlimento || !producto.costo || !producto.lugarCompra) {
        throw new Error(`Datos incompletos para el producto: ${JSON.stringify(producto)}`);
      }

      // Crear el detalle de la factura para cada producto
      await DetalleFactura.create({
        noFactura: factura.noFactura,
        serieFactura: factura.serieFactura,
        idAlimento: producto.idAlimento,
        noReserva: producto.noReserva || null,
        costo: producto.costo,
        fechaCompra: new Date(),
        lugarCompra: producto.lugarCompra
      }, { transaction });
    }

    // Confirmar la transacción si todo va bien
    await transaction.commit();

    // Respuesta exitosa
    res.status(201).json({ message: 'Compra realizada con éxito', factura });
  } catch (error) {
    // Deshacer la transacción en caso de error
    console.error('Error en la compra:', error);
    await transaction.rollback();
    res.status(500).json({ message: 'Error al realizar la compra', error: error.message });
  }
};

module.exports = { realizarCompra };