const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = knex(config)

function getAccountDetails(id, db = connection) {
  return db('accounts')
    .join('users', 'accounts.user_id', 'users.id')
    .where('user_id', id)
    .select('accounts.id as id', 'users.id as userId', 'name', 'balance', 'balance_updated_at as balanceLastUpdated')
}

function addAccountDetails(data, db = connection) {
  return db('accounts')
    .insert({
      name: data.name,
      balance: data.balance,
      balance_updated_at: Date.now(),
      user_id: data.id
    })
}

module.exports = {
  getAccountDetails,
  addAccountDetails
}