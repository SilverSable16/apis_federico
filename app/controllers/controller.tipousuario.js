const db = require('../config/db.config.js');
const TipoUsuario = db.TipoUsuario;
const moment = require('moment'); // Aunque no se use, se puede eliminar si no es necesario

exports.create = async (req, res) => {
    try {
        const { idTipoUsuario, nombreTipo } = req.body;

        if (!idTipoUsuario || !nombreTipo) {
            return res.status(400).json({
                message: "Both idTipoUsuario and nombreTipo are required!",
                error: "Validation Error"
            });
        }

        const tipoUsuario = await TipoUsuario.create({
            idTipoUsuario: idTipoUsuario,
            nombreTipo: nombreTipo
        });

        res.status(200).json({
            message: "TipoUsuario created successfully with id = " + tipoUsuario.idTipoUsuario,
            tipoUsuario: tipoUsuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create TipoUsuario!",
            error: error.message
        });
    }
}

exports.retrieveAllTipoUsuarios = async (req, res) => {
    try {
        const tipoUsuarioInfos = await TipoUsuario.findAll();
        res.status(200).json({
            message: "Successfully retrieved all TipoUsuarios' Infos!",
            tipoUsuarios: tipoUsuarioInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving TipoUsuarios!",
            error: error.message
        });
    }
}

exports.getTipoUsuarioById = async (req, res) => {
    try {
        const tipoUsuarioId = req.params.id;
        const tipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);
        
        if (!tipoUsuario) {
            return res.status(404).json({
                message: "TipoUsuario with id = " + tipoUsuarioId + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved TipoUsuario with id = " + tipoUsuarioId,
            tipoUsuario: tipoUsuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving TipoUsuario with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        const tipoUsuarioId = req.params.id;
        const tipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);

        if (!tipoUsuario) {
            return res.status(404).json({
                message: "TipoUsuario with id = " + tipoUsuarioId + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            nombreTipo: req.body.nombreTipo
        };

        const updated = await TipoUsuario.update(updatedObject, {
            where: { idTipoUsuario: tipoUsuarioId }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update TipoUsuario with id = " + tipoUsuarioId,
                error: "Update failed"
            });
        }

        const updatedTipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);

        res.status(200).json({
            message: "TipoUsuario updated successfully with id = " + tipoUsuarioId,
            tipoUsuario: updatedTipoUsuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating TipoUsuario with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const tipoUsuarioId = req.params.id;
        const tipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);

        if (!tipoUsuario) {
            return res.status(404).json({
                message: "TipoUsuario with id = " + tipoUsuarioId + " does not exist!",
                error: "404"
            });
        }

        await tipoUsuario.destroy();
        res.status(200).json({
            message: "TipoUsuario deleted successfully with id = " + tipoUsuarioId,
            tipoUsuario: tipoUsuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting TipoUsuario with id = " + req.params.id,
            error: error.message
        });
    }
}
