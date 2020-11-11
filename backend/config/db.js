const config = require('../knexfile')
const knex = require('knex')(config)

knex.migrate.latest([config])  // sempre executar todas as migrations antes de ligar o backend
module.exports = knex