module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define('Mesa', {
        codigoMesa: {
            type: Sequelize.STRING(4),
            primaryKey: true,
            field: 'CODIGO_MESA'
        },
        idSucursal: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'ID_SUCURSAL'
        },
        numMesa: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'NUM_MESA'
        },
        capacidad: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'CAPACIDAD'
        },
        precio: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'PRECIO'
        }
    }, {
        tableName: 'MESA', // Asume que la tabla en la base de datos se llama 'MESA'
        timestamps: false // Desactiva los timestamps si la tabla no los usa
    });

    return Mesa;
};
