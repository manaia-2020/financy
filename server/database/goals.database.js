const knex = require('knex')
const config = require('../../knexfile').development
const connection = knex(config)

function saveNewGoal (data, db = connection) {
  return db('goals').insert({
    name: data.name,
    goal_date: Date.parse(data.date),
    user_id: data.id,
    amount: Number(String(data.amount).replace(/[^0-9.-]+/g, ''))
  })
}

module.exports = {
  saveNewGoal
}
