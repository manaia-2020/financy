const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const database = knex(config)

function getAllTransForUser (userId, accountId, db = database) {
  return db('transactions')
    .where({ user_id: userId })
    .where({ account_id: accountId })
}

module.exports = {
  getAllTransForUser
}
