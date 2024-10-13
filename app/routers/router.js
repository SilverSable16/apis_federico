
let express = require('express');
let router = express.Router();
 
const empleado = require('../controllers/controller.empleado.js');

router.post('/empleado/create', empleado.create);
router.get('/empleado/all', empleado.retrieveAllEmpleados);
router.get('/empleado/onebyid/:id', empleado.getEmpleadoById);
router.put('/empleado/update/:id', empleado.updateById);
router.delete('/empleado/delete/:id', empleado.deleteById);

const reserva = require('../controllers/controller.reserva.js');

router.post('/reserva/create', reserva.create);
router.get('/reserva/all', reserva.retrieveAllReservas);
router.get('/reserva/onebyid/:id', reserva.getReservaById);
router.put('/reserva/update/:id', reserva.updateById);
router.delete('/reserva/delete/:id', reserva.deleteById);

const cliente = require('../controllers/controller.cliente.js');

router.post('/cliente/create', cliente.create);
router.get('/cliente/all', cliente.retrieveAllClientes);
router.get('/cliente/onebyid/:id', cliente.getClienteById);
router.put('/cliente/update/:id', cliente.updateById);
router.delete('/cliente/delete/:id', cliente.deleteById);

const tipoMenu = require('../controllers/controller.tipomenu.js');

router.post('/tipomenu/create', tipoMenu.create);
router.get('/tipomenu/all', tipoMenu.retrieveAllTipoMenus);
router.get('/tipomenu/onebyid/:id', tipoMenu.getTipoMenuById);
router.put('/tipomenu/update/:id', tipoMenu.updateById);
router.delete('/tipomenu/delete/:id', tipoMenu.deleteById);

const menuGeneral = require('../controllers/controller.menugeneral.js');

router.post('/menugeneral/create', menuGeneral.create);
router.get('/menugeneral/all', menuGeneral.retrieveAllMenuGenerals);
router.get('/menugeneral/onebyid/:id', menuGeneral.getMenuGeneralById);
router.put('/menugeneral/update/:id', menuGeneral.updateById);
router.delete('/menugeneral/delete/:id', menuGeneral.deleteById);

const sucursal = require('../controllers/controller.sucursal.js');

router.post('/sucursal/create', sucursal.create);
router.get('/sucursal/all', sucursal.retrieveAllSucursales);
router.get('/sucursal/onebyid/:id', sucursal.getSucursalById);
router.put('/sucursal/update/:id', sucursal.updateById);
router.delete('/sucursal/delete/:id', sucursal.deleteById);

const tipoUsuario = require('../controllers/controller.tipousuario.js');

router.post('/tipoUsuario/create', tipoUsuario.create);
router.get('/tipoUsuario/all', tipoUsuario.retrieveAllTipoUsuarios);
router.get('/tipoUsuario/onebyid/:id', tipoUsuario.getTipoUsuarioById);
router.put('/tipoUsuario/update/:id', tipoUsuario.updateById);
router.delete('/tipoUsuario/delete/:id', tipoUsuario.deleteById);

const mesa = require('../controllers/controller.mesa.js');

router.post('/mesa/create', mesa.create);
router.get('/mesa/all', mesa.retrieveAllMesas);
router.get('/mesa/onebycodigo/:codigo', mesa.getMesaByCodigo);
router.put('/mesa/update/:codigo', mesa.updateByCodigo);
router.delete('/mesa/delete/:codigo', mesa.deleteByCodigo);

const detalleReserva = require('../controllers/controller.detallereserva.js');

router.post('/detalle-reserva/create', detalleReserva.create);
router.get('/detalle-reserva/all', detalleReserva.retrieveAllDetalles);
router.get('/detalle-reserva/onebyid/:id', detalleReserva.getDetalleById);
router.put('/detalle-reserva/update/:id', detalleReserva.updateById);
router.delete('/detalle-reserva/delete/:id', detalleReserva.deleteById);

const usuario = require('../controllers/controller.usuario.js');

router.post('/usuario/create', usuario.create);
router.get('/usuario/autenticar', usuario.autenticar);
router.get('/usuario/all', usuario.retrieveAllUsuarios);
router.get('/usuario/onebyid/:id', usuario.getUsuarioById);
router.put('/usuario/update/:id', usuario.updateById);
router.delete('/usuario/delete/:id', usuario.deleteById);

//const fac = require('../controllers/controller.factura.js');

//router.post('/comprar', fac.comprar);
const DetalleFactura = require('../controllers/controller.factura.js');

// Ruta para realizar la compra
router.post('/compras', DetalleFactura.realizarCompra);

router.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando');
});


module.exports = router;

