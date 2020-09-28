const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = knex(config)

function deleteAccount (id, db = connection) {
  return db('accounts')
    .where('id', id)
    .del()
}

module.exports = {
  deleteAccount
}
