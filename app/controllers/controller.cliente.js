const db = require('../config/db.config.js');
const Cliente = db.Cliente;
const moment = require('moment');

exports.create = async (req, res) => {
    let cliente = {};
    try {
        console.log('Received request body:', req.body);
        
        cliente.idCliente = req.body.idCliente;
        cliente.correo = req.body.correo;
        cliente.nombre1 = req.body.nombre1;
        cliente.nombre2 = req.body.nombre2;
        cliente.apellido1 = req.body.apellido1;
        cliente.apellido2 = req.body.apellido2;
        cliente.nit = req.body.nit;
        cliente.telefono = req.body.telefono;
        cliente.fechaNacimiento = moment(req.body.fechaNacimiento).format('YYYY-MM-DD');
        cliente.fechaCreacion = moment(req.body.fechaCreacion).format('YYYY-MM-DD');
        cliente.ultimaActualizacion = moment(req.body.ultimaActualizacion).format('YYYY-MM-DD');

        const result = await Cliente.create(cliente);

        res.status(200).json({
            message: "Cliente created successfully with id = " + result.idCliente,
            cliente: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create Cliente!",
            error: error.message
        });
    }
}

exports.retrieveAllClientes = async (req, res) => {
    try {
        const clienteInfos = await Cliente.findAll();
        res.status(200).json({
            message: "Successfully retrieved all Clientes' Infos!",
            clientes: clienteInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Clientes!",
            error: error.message
        });
    }
}

exports.getClienteById = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);
        
        if (!cliente) {
            return res.status(404).json({
                message: "Cliente with id = " + clienteId + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved Cliente with id = " + clienteId,
            cliente: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Cliente with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente with id = " + clienteId + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            correo: req.body.correo,
            nombre1: req.body.nombre1,
            nombre2: req.body.nombre2,
            apellido1: req.body.apellido1,
            apellido2: req.body.apellido2,
            nit: req.body.nit,
            telefono: req.body.telefono,
            fechaNacimiento: moment(req.body.fechaNacimiento).format('YYYY-MM-DD'),
            fechaCreacion: moment(req.body.fechaCreacion).format('YYYY-MM-DD'),
            ultimaActualizacion: moment(req.body.ultimaActualizacion).format('YYYY-MM-DD')
        };

        const updated = await Cliente.update(updatedObject, {
            where: { idCliente: clienteId }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update Cliente with id = " + clienteId,
                error: "Update failed"
            });
        }

        const updatedCliente = await Cliente.findByPk(clienteId);

        res.status(200).json({
            message: "Cliente updated successfully with id = " + clienteId,
            cliente: updatedCliente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Cliente with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente with id = " + clienteId + " does not exist!",
                error: "404"
            });
        }

        await cliente.destroy();
        res.status(200).json({
            message: "Cliente deleted successfully with id = " + clienteId,
            cliente: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Cliente with id = " + req.params.id,
            error: error.message
        });
    }
}
