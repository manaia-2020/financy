const knex = require('knex')
const config = require('../../knexfile').development
const connection = knex(config)
const { generateHash } = require('authenticare/server')


function saveNewUser (user, db = connection) {
    user.email = user.username
    return userExists(user.email, db)
      .then(exists => {
        if (exists) {
          return Promise.reject(new Error('User exists'))
        }
      })
      .then(() => generateHash(user.password))
      .then(passwordHash => {
        return db('users')
          .insert({
            email: user.email,
            password_hash: passwordHash
          })
      })
  }
  
  function userExists (email, db = connection) {
    return db('users')
      .count('id as n')
      .where('email', email)
      .then(count => {
        return count[0].n > 0
      })
  }
  
  function getUserByName (email, db = connection) {
    return db('users')
      .where('email', email)
      .select('id', 'email as username', 'password_hash as hash')
      .first()
      .then(user => {
        return user
      })
  }
  
  module.exports ={
      saveNewUser,
      getUserByName,
      userExists
  }