const db = require('../config/db.config.js');
const Mesa = db.Mesa;

exports.create = async (req, res) => {
    let mesa = {};
    try {
        console.log('Received request body:', req.body);

        mesa.codigoMesa = req.body.codigoMesa;
        mesa.idSucursal = req.body.idSucursal;
        mesa.numMesa = req.body.numMesa;
        mesa.capacidad = req.body.capacidad;
        mesa.precio = req.body.precio;

        const result = await Mesa.create(mesa);

        res.status(200).json({
            message: "Mesa created successfully with codigoMesa = " + result.codigoMesa,
            mesa: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create Mesa!",
            error: error.message
        });
    }
}

exports.retrieveAllMesas = async (req, res) => {
    try {
        const mesaInfos = await Mesa.findAll();
        res.status(200).json({
            message: "Successfully retrieved all Mesas' Infos!",
            mesas: mesaInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Mesas!",
            error: error.message
        });
    }
}

exports.getMesaByCodigo = async (req, res) => {
    try {
        const codigoMesa = req.params.codigo;
        const mesa = await Mesa.findByPk(codigoMesa);
        
        if (!mesa) {
            return res.status(404).json({
                message: "Mesa with codigoMesa = " + codigoMesa + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved Mesa with codigoMesa = " + codigoMesa,
            mesa: mesa
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Mesa with codigoMesa = " + req.params.codigo,
            error: error.message
        });
    }
}

exports.updateByCodigo = async (req, res) => {
    try {
        const codigoMesa = req.params.codigo;
        const mesa = await Mesa.findByPk(codigoMesa);

        if (!mesa) {
            return res.status(404).json({
                message: "Mesa with codigoMesa = " + codigoMesa + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            idSucursal: req.body.idSucursal,
            numMesa: req.body.numMesa,
            capacidad: req.body.capacidad,
            precio: req.body.precio
        };

        const updated = await Mesa.update(updatedObject, {
            where: { codigoMesa: codigoMesa }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update Mesa with codigoMesa = " + codigoMesa,
                error: "Update failed"
            });
        }

        const updatedMesa = await Mesa.findByPk(codigoMesa);

        res.status(200).json({
            message: "Mesa updated successfully with codigoMesa = " + codigoMesa,
            mesa: updatedMesa
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Mesa with codigoMesa = " + req.params.codigo,
            error: error.message
        });
    }
}

exports.deleteByCodigo = async (req, res) => {
    try {
        const codigoMesa = req.params.codigo;
        const mesa = await Mesa.findByPk(codigoMesa);

        if (!mesa) {
            return res.status(404).json({
                message: "Mesa with codigoMesa = " + codigoMesa + " does not exist!",
                error: "404"
            });
        }

        await mesa.destroy();
        res.status(200).json({
            message: "Mesa deleted successfully with codigoMesa = " + codigoMesa,
            mesa: mesa
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Mesa with codigoMesa = " + req.params.codigo,
            error: error.message
        });
    }
}
