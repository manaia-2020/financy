const knex = require('knex')
const config = require('../../knexfile').development
const connection = knex(config)

function saveNewGoal (data, db = connection) {
  return db('goals').insert({
    name: data.name,
    goal_date: Date.parse(data.date),
    user_id: data.id
  })
}

module.exports = {
  saveNewGoal
}
