const db = require('../config/db.config.js');
const DetalleReserva = db.DetalleReserva;
const Reserva = db.Reserva;  // Asumiendo que has importado el modelo Reserva
const Mesa = db.Mesa;        // Asumiendo que has importado el modelo Mesa

exports.create = async (req, res) => {
    try {
        const {
            idDetalleReserva,
            codigoReserva,
            codigoMesa,
            costo,
            fechaCompra,
            lugarCompra
        } = req.body;

        if (!idDetalleReserva || !codigoReserva || !codigoMesa || !costo || !fechaCompra || !lugarCompra) {
            return res.status(400).json({
                message: "All fields are required!",
                error: "Validation Error"
            });
        }

        const detalleReserva = await DetalleReserva.create({
            idDetalleReserva: idDetalleReserva,
            codigoReserva: codigoReserva,
            codigoMesa: codigoMesa,
            costo: costo,
            fechaCompra: fechaCompra,
            lugarCompra: lugarCompra
        });

        res.status(200).json({
            message: "DetalleReserva created successfully with id = " + detalleReserva.idDetalleReserva,
            detalleReserva: detalleReserva
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create DetalleReserva!",
            error: error.message
        });
    }
}

exports.retrieveAllDetalles = async (req, res) => {
    try {
        const detalleReservaInfos = await DetalleReserva.findAll();
        res.status(200).json({
            message: "Successfully retrieved all DetalleReservas' Infos!",
            detalleReservas: detalleReservaInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving DetalleReservas!",
            error: error.message
        });
    }
}

exports.getDetalleById = async (req, res) => {
    try {
        const idDetalleReserva = req.params.id;
        const detalleReserva = await DetalleReserva.findByPk(idDetalleReserva);
        
        if (!detalleReserva) {
            return res.status(404).json({
                message: "DetalleReserva with idDetalleReserva = " + idDetalleReserva + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved DetalleReserva with idDetalleReserva = " + idDetalleReserva,
            detalleReserva: detalleReserva
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving DetalleReserva with idDetalleReserva = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        const idDetalleReserva = req.params.id;
        const detalleReserva = await DetalleReserva.findByPk(idDetalleReserva);

        if (!detalleReserva) {
            return res.status(404).json({
                message: "DetalleReserva with idDetalleReserva = " + idDetalleReserva + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            codigoReserva: req.body.codigoReserva,
            codigoMesa: req.body.codigoMesa,
            costo: req.body.costo,
            fechaCompra: req.body.fechaCompra,
            lugarCompra: req.body.lugarCompra
        };

        const updated = await DetalleReserva.update(updatedObject, {
            where: { idDetalleReserva: idDetalleReserva }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update DetalleReserva with idDetalleReserva = " + idDetalleReserva,
                error: "Update failed"
            });
        }

        const updatedDetalle = await DetalleReserva.findByPk(idDetalleReserva);

        res.status(200).json({
            message: "DetalleReserva updated successfully with idDetalleReserva = " + idDetalleReserva,
            detalleReserva: updatedDetalle
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating DetalleReserva with idDetalleReserva = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const idDetalleReserva = req.params.id;
        const detalleReserva = await DetalleReserva.findByPk(idDetalleReserva);

        if (!detalleReserva) {
            return res.status(404).json({
                message: "DetalleReserva with idDetalleReserva = " + idDetalleReserva + " does not exist!",
                error: "404"
            });
        }

        await detalleReserva.destroy();
        res.status(200).json({
            message: "DetalleReserva deleted successfully with idDetalleReserva = " + idDetalleReserva,
            detalleReserva: detalleReserva
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting DetalleReserva with idDetalleReserva = " + req.params.id,
            error: error.message
        });
    }
}
