// Update with your settings.
const { data } = require('./.env')  // informações de conexão com o BD

module.exports = {
  client: 'postgresql',
  connection: data,
  
  pool: {
    min: 2,
    max: 10
  },
  
  migrations: {
    tableName: 'knex_migrations'
  }
};