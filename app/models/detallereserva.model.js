module.exports = (sequelize, Sequelize) => {
    const DetalleReserva = sequelize.define('DetalleReserva', {
        idDetalleReserva: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            field: 'ID_DETALLE_RESERVA'
        },
        codigoReserva: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'CODIGO_RESERVA'
        },
        codigoMesa: {
            type: Sequelize.STRING(4),
            allowNull: false,
            field: 'CODIGO_MESA'
        },
        costo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'COSTO'
        },
        fechaCompra: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'FECHA_COMPRA'
        },
        lugarCompra: {
            type: Sequelize.STRING(6),
            allowNull: false,
            field: 'LUGAR_COMPRA'
        }
    }, {
        tableName: 'DETALLE_RESERVA', // Asume que la tabla en la base de datos se llama 'DETALLE_RESERVA'
        timestamps: false // Desactiva los timestamps si la tabla no los usa
    });

    return DetalleReserva;
};
