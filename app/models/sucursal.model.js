module.exports = (sequelize, Sequelize) => {
    const Sucursal = sequelize.define('Sucursal', {
        idSucursal: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Asume que el ID es autoincrementable
            field: 'ID_SUCURSAL'
        },
        nombreSucursal: {
            type: Sequelize.STRING(30),
            allowNull: false,
            field: 'NOMBRE_SUCURSAL'
        },
        direccion: {
            type: Sequelize.STRING(200),
            allowNull: false,
            field: 'DIRECCION'
        },
        telefono: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'TELEFONO'
        },
        fechaCreacion: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'FECHA_CREACION'
        },
        fechaActualizacion: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'FECHA_ACTUALIZACION'
        }
    }, {
        tableName: 'SUCURSAL', // Asume que la tabla en la base de datos se llama 'SUCURSAL'
        timestamps: false     // Desactiva los timestamps si la tabla no los usa
    });

    return Sucursal;
};
