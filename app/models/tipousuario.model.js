module.exports = (sequelize, Sequelize) => {
    const TipoUsuario = sequelize.define('TipoUsuario', {
        idTipoUsuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Asume que el ID es autoincrementable
            field: 'ID_TIPO_USUARIO'
        },
        nombreTipo: {
            type: Sequelize.STRING(20),
            allowNull: false,
            field: 'NOMBRE_TIPO'
        }
    }, {
        tableName: 'TIPO_USUARIO', // Asume que la tabla en la base de datos se llama 'TIPO_USUARIO'
        timestamps: false     // Desactiva los timestamps si la tabla no los usa
    });

    return TipoUsuario;
};
