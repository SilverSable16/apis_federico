

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Empleado = require('../models/empleado.model.js')(sequelize, Sequelize);
db.Reserva = require('../models/reserva.model.js')(sequelize, Sequelize);
db.Cliente = require('../models/cliente.model.js')(sequelize, Sequelize);
db.TipoMenu = require('../models/tipomenu.model.js')(sequelize, Sequelize);
db.MenuGeneral = require('../models/menugeneral.model.js')(sequelize, Sequelize);
db.Sucursal = require('../models/sucursal.model.js')(sequelize, Sequelize);
db.TipoUsuario = require('../models/tipousuario.model.js')(sequelize, Sequelize);
db.Mesa = require('../models/mesa.model.js')(sequelize, Sequelize);
db.DetalleReserva = require('../models/detallereserva.model.js')(sequelize, Sequelize);
//db.DetalleFactura = require('../models/detallefactura.model.js')(sequelize, Sequelize);
db.Usuario = require('../models/usuario.model.js')(sequelize, Sequelize);
//db.Factura = require('../models/factura.model.js')(sequelize, Sequelize);
db.Factura = require('../models/factura.model.js')(sequelize, Sequelize);
db.DetalleFactura = require('../models/detallefactura.model.js')(sequelize, Sequelize);
 module.exports = db;