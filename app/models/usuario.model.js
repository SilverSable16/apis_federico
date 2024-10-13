module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        correo: {
            type: Sequelize.STRING(255),
            field: 'CORREO', // Debe coincidir exactamente con el nombre en la base de datos
            allowNull: false,
        },
        contrasenia: {
            type: Sequelize.STRING(255),
            field: 'CONTRASENIA', // Debe coincidir exactamente con el nombre en la base de datos
            allowNull: false,
        },
    }, {
        tableName: 'USUARIO', // Verifica que el nombre de la tabla sea correcto
        timestamps: false,
    });

    return Usuario;
};
