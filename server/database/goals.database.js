const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = knex(config)

function saveNewGoal (data, db = connection) {
  return db('goals').insert({
    name: data.name,
    goal_date: Date.parse(data.date),
    user_id: data.id,
    amount: Number(String(data.amount).replace(/[^0-9.-]+/g, ''))
  })
}

function getAllGoalsByUserId (id, db = connection) {
  return db('goals').where('goals.user_id', id)
}

module.exports = {
  saveNewGoal,
  getAllGoalsByUserId
}
