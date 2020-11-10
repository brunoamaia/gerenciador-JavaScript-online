const config = require('../knexfile.ts')
const knex = require('knex')(config)

module.exports = knex