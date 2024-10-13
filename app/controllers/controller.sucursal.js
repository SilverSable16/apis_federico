const db = require('../config/db.config.js');
const Sucursal = db.Sucursal;
const moment = require('moment');

exports.create = async (req, res) => {
    try {
        const { idSucursal, nombreSucursal, direccion, telefono, fechaCreacion, fechaActualizacion } = req.body;

        if (!idSucursal || !nombreSucursal || !direccion || !telefono || !fechaCreacion || !fechaActualizacion) {
            return res.status(400).json({
                message: "All fields are required!",
                error: "Validation Error"
            });
        }

        const sucursal = await Sucursal.create({
            idSucursal: idSucursal,
            nombreSucursal: nombreSucursal,
            direccion: direccion,
            telefono: telefono,
            fechaCreacion: fechaCreacion,
            fechaActualizacion: fechaActualizacion
        });

        res.status(200).json({
            message: "Sucursal created successfully with id = " + sucursal.idSucursal,
            sucursal: sucursal
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create Sucursal!",
            error: error.message
        });
    }
}

exports.retrieveAllSucursales = async (req, res) => {
    try {
        const sucursalInfos = await Sucursal.findAll();
        res.status(200).json({
            message: "Successfully retrieved all Sucursales' Infos!",
            sucursales: sucursalInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Sucursales!",
            error: error.message
        });
    }
}

exports.getSucursalById = async (req, res) => {
    try {
        const sucursalId = req.params.id;
        const sucursal = await Sucursal.findByPk(sucursalId);
        
        if (!sucursal) {
            return res.status(404).json({
                message: "Sucursal with id = " + sucursalId + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved Sucursal with id = " + sucursalId,
            sucursal: sucursal
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Sucursal with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        const sucursalId = req.params.id;
        const sucursal = await Sucursal.findByPk(sucursalId);

        if (!sucursal) {
            return res.status(404).json({
                message: "Sucursal with id = " + sucursalId + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            nombreSucursal: req.body.nombreSucursal,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            fechaCreacion: moment(req.body.fechaCreacion).format('YYYY-MM-DD'),
            fechaActualizacion: moment(req.body.fechaActualizacion).format('YYYY-MM-DD')
        };

        const updated = await Sucursal.update(updatedObject, {
            where: { idSucursal: sucursalId }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update Sucursal with id = " + sucursalId,
                error: "Update failed"
            });
        }

        const updatedSucursal = await Sucursal.findByPk(sucursalId);

        res.status(200).json({
            message: "Sucursal updated successfully with id = " + sucursalId,
            sucursal: updatedSucursal
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Sucursal with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const sucursalId = req.params.id;
        const sucursal = await Sucursal.findByPk(sucursalId);

        if (!sucursal) {
            return res.status(404).json({
                message: "Sucursal with id = " + sucursalId + " does not exist!",
                error: "404"
            });
        }

        await sucursal.destroy();
        res.status(200).json({
            message: "Sucursal deleted successfully with id = " + sucursalId,
            sucursal: sucursal
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Sucursal with id = " + req.params.id,
            error: error.message
        });
    }
}
