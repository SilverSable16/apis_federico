const db = require('../config/db.config.js');
const Usuario = db.Usuario;

exports.create = async (req, res) => {
    let usuario = {};
    try {
        console.log('Received request body:', req.body);

        // Asegúrate de que estás accediendo correctamente a los campos
        usuario.correo = req.body.correo; 
        usuario.contrasenia = req.body.contrasenia; // Cambia 'contras' por 'contrasenia'

        // Log para verificar el objeto antes de insertarlo
        console.log('Usuario object before creation:', usuario);

        const result = await Usuario.create(usuario);

        res.status(200).json({
            message: "Usuario created successfully with id = " + result.id,
            usuario: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create Usuario!",
            error: error.message
        });
    }
};

exports.autenticar = async (req, res) => {
    const { correo, contrasenia } = req.body;

    try {
        // Busca al usuario por correo y contrasenia
        const usuario = await Usuario.findOne({ where: { correo: correo, contrasenia: contrasenia } });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Aquí puedes generar un token o manejar la sesión según lo que necesites
        res.status(200).json({ message: 'Inicio de sesión exitoso.' });
    } catch (error) {
        res.status(500).json({ message: 'Error en la autenticación.', error: error.message });
    }
};



exports.retrieveAllUsuarios = async (req, res) => {
    try {
        const usuarioInfos = await Usuario.findAll();
        res.status(200).json({
            message: "Successfully retrieved all Usuarios' Infos!",
            usuarios: usuarioInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Usuarios!",
            error: error.message
        });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await Usuario.findByPk(usuarioId);
        
        if (!usuario) {
            return res.status(404).json({
                message: "Usuario with id = " + usuarioId + " not found!",
                error: "404"
            });
        }

        res.status(200).json({
            message: "Successfully retrieved Usuario with id = " + usuarioId,
            usuario: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Usuario with id = " + req.params.id,
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario with id = " + usuarioId + " not found for update!",
                error: "404"
            });
        }

        const updatedObject = {
            correo: req.body.correo,
            contrasenia: req.body.contrasenia
        };

        const updated = await Usuario.update(updatedObject, {
            where: { id: usuarioId }
        });

        if (updated[0] === 0) {
            return res.status(500).json({
                message: "Failed to update Usuario with id = " + usuarioId,
                error: "Update failed"
            });
        }

        const updatedUsuario = await Usuario.findByPk(usuarioId);

        res.status(200).json({
            message: "Usuario updated successfully with id = " + usuarioId,
            usuario: updatedUsuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Usuario with id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario with id = " + usuarioId + " does not exist!",
                error: "404"
            });
        }

        await usuario.destroy();
        res.status(200).json({
            message: "Usuario deleted successfully with id = " + usuarioId,
            usuario: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Usuario with id = " + req.params.id,
            error: error.message
        });
    }
};
