module.exports = (sequelize, Sequelize) => {
    const TipoMenu = sequelize.define('TipoMenu', {
        idTipoMenu: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Asume que el ID es autoincrementable
            field: 'ID_TIPO_MENU'
        },
        nombreMenu: {
            type: Sequelize.STRING(12),
            allowNull: false,
            field: 'NOMBRE_MENU'
        }
    }, {
        tableName: 'TIPO_MENU', // Asume que la tabla en la base de datos se llama 'TIPO_MENU'
        timestamps: false     // Desactiva los timestamps si la tabla no los usa
    });

    return TipoMenu;
};
