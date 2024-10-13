

const env = {
  database: 'control_pago',
  username: 'silverhand',
  password: 'gOLeS2aSZGP1TXo71MZSSIctZopqYBvs',
  host: 'dpg-crp0ige8ii6s73cag16g-a.singapore-postgres.render.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;