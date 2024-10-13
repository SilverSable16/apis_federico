const db = require('../config/db.config.js');
const TipoMenu = db.TipoMenu;


exports.create = async (req, res) => {
    try {
        const { idTipoMenu, nombreMenu } = req.body;

        if (!idTipoMenu || !nombreMenu) {
            return res.status(400).json({
                message: "ID_TIPO_MENU and NOMBRE_MENU are required fields!",
                error: "Validation Error"
            });
        }

        const tipoMenu = await TipoMenu.create({
            idTipoMenu: idTipoMenu,
            nombreMenu: nombreMenu
        });

        res.status(200).json({
            message: "TipoMenu created successfully with id = " + tipoMenu.idTipoMenu,
            tipoMenu: tipoMenu
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create TipoMenu!",
            error: error.message
        });
    }
}

exports.retrieveAllTipoMenus = async (req, res) => {
    try {
        const tipoMenuInfos = await TipoMenu.findAll();
        res.status(200).json({
            message: "Successfully retrieved all TipoMenus' Infos!",
            tipoMenus: tipoMenuInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving TipoMenus!",
            error: error.message
        });
    }
}

exports.getTipoMenuById = async (req, res) => {
    try {
        const tipoMenuId = req.params.id;
        const tipoMenu = await TipoMenu.findByPk(tipoMenuId);
        
        if (!tipoMenu) {
            return res.status(404).json({
                message: "TipoMenu with id = " + tipoMenuId + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved TipoMenu with id = " + tipoMenuId,
            tipoMenu: tipoMenu
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving TipoMenu with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        const tipoMenuId = req.params.id;
        const tipoMenu = await TipoMenu.findByPk(tipoMenuId);

        if (!tipoMenu) {
            return res.status(404).json({
                message: "TipoMenu with id = " + tipoMenuId + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            nombreMenu: req.body.nombreMenu
        };

        const updated = await TipoMenu.update(updatedObject, {
            where: { idTipoMenu: tipoMenuId }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update TipoMenu with id = " + tipoMenuId,
                error: "Update failed"
            });
        }

        const updatedTipoMenu = await TipoMenu.findByPk(tipoMenuId);

        res.status(200).json({
            message: "TipoMenu updated successfully with id = " + tipoMenuId,
            tipoMenu: updatedTipoMenu
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating TipoMenu with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const tipoMenuId = req.params.id;
        const tipoMenu = await TipoMenu.findByPk(tipoMenuId);

        if (!tipoMenu) {
            return res.status(404).json({
                message: "TipoMenu with id = " + tipoMenuId + " does not exist!",
                error: "404"
            });
        }

        await tipoMenu.destroy();
        res.status(200).json({
            message: "TipoMenu deleted successfully with id = " + tipoMenuId,
            tipoMenu: tipoMenu
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting TipoMenu with id = " + req.params.id,
            error: error.message
        });
    }
}
