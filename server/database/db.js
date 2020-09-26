const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = knex(config)
const { generateHash } = require('authenticare/server')

function saveNewUser (user, db = connection) {
  user.email = user.username
  return generateHash(user.password)
    .then((passwordHash) => {
      return db('users')
        .insert({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password_hash: passwordHash,
          created_at: Date.now()
        })
    })
    .catch((err) => console.log(err))
}

function userExists (email, db = connection) {
  return db('users')
    .count('id as n')
    .where('email', email)
    .then((count) => {
      return count[0].n > 0
    })
}

function getUserByName (email, db = connection) {
  return db('users')
    .where('email', email)
    .select('id', 'email as username', 'password_hash as hash')
    .first()
    .then((user) => {
      return user
    })
}

function getAccountDetails (id, db = connection) {
  return db('accounts')
    .join('users', 'accounts.user_id', 'users.id')
    .where('user_id', id)
    .select('accounts.id as id', 'users.id as userId', 'name', 'balance', 'balance_updated_at as balanceLastUpdated')
}

function addAccountDetails (data, db = connection) {
  return db('accounts')
    .insert({
      name: data.name,
      balance: data.balance,
      balance_updated_at: Date.now(),
      user_id: data.id
    })
}

module.exports = {
  saveNewUser,
  getUserByName,
  userExists,
  getAccountDetails,
  addAccountDetails
}
