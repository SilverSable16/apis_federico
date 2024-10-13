module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define('Reserva', {
        noReserva: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            field: 'NO_RESERVA'
        },
        fechaReserva: {
            type: Sequelize.DATE,
            field: 'FECHA_RESERVA'
        },
        horaInicial: {
            type: Sequelize.INTEGER,
            field: 'HORA_INICIAL'
        },
        horaFinal: {
            type: Sequelize.INTEGER,
            field: 'HORA_FINAL'
        },
        cantidadPersonas: {
            type: Sequelize.INTEGER,
            field: 'CANTIDAD_PERSONAS'
        },
        precio: {
            type: Sequelize.FLOAT,
            field: 'PRECIO'
        },
        idCliente: {
            type: Sequelize.INTEGER,
            field: 'ID_CLIENTE'
        }
    }, {
        tableName: 'RESERVA', // Asume que la tabla en la base de datos se llama 'RESERVA'
        timestamps: false     // Desactiva los timestamps si la tabla no los usa
    });

    return Reserva;
};
