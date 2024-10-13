const db = require('../config/db.config.js');
const Reserva = db.Reserva;
const moment = require('moment');

exports.create = async (req, res) => {
    let reserva = {};
    try {
        console.log('Received request body:', req.body);
        
        reserva.noReserva = req.body.noReserva;
        reserva.fechaReserva = moment(req.body.fechaReserva).format('YYYY-MM-DD');
        reserva.horaInicial = req.body.horaInicial;
        reserva.horaFinal = req.body.horaFinal;
        reserva.cantidadPersonas = req.body.cantidadPersonas;
        reserva.precio = req.body.precio;
        reserva.idCliente = req.body.idCliente;

        const result = await Reserva.create(reserva);

        res.status(200).json({
            message: "Reserva created successfully with id = " + result.noReserva,
            reserva: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create Reserva!",
            error: error.message
        });
    }
}

exports.retrieveAllReservas = async (req, res) => {
    try {
        const reservaInfos = await Reserva.findAll();
        res.status(200).json({
            message: "Successfully retrieved all Reservas' Infos!",
            reservas: reservaInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Reservas!",
            error: error.message
        });
    }
}

exports.getReservaById = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const reserva = await Reserva.findByPk(reservaId);
        
        if (!reserva) {
            return res.status(404).json({
                message: "Reserva with id = " + reservaId + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved Reserva with id = " + reservaId,
            reserva: reserva
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Reserva with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "Reserva with id = " + reservaId + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            fechaReserva: moment(req.body.fechaReserva).format('YYYY-MM-DD'),
            horaInicial: req.body.horaInicial,
            horaFinal: req.body.horaFinal,
            cantidadPersonas: req.body.cantidadPersonas,
            precio: req.body.precio,
            idCliente: req.body.idCliente
        };

        const updated = await Reserva.update(updatedObject, {
            where: { noReserva: reservaId }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update Reserva with id = " + reservaId,
                error: "Update failed"
            });
        }

        const updatedReserva = await Reserva.findByPk(reservaId);

        res.status(200).json({
            message: "Reserva updated successfully with id = " + reservaId,
            reserva: updatedReserva
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Reserva with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "Reserva with id = " + reservaId + " does not exist!",
                error: "404"
            });
        }

        await reserva.destroy();
        res.status(200).json({
            message: "Reserva deleted successfully with id = " + reservaId,
            reserva: reserva
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Reserva with id = " + req.params.id,
            error: error.message
        });
    }
}
