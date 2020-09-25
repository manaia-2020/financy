const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]

const { getCurrentBalance } = require('./bankDb')
const database = knex(config)

const oneWeekInSecs = 1000 * 60 * 60 * 24 * 7

function getPreviousBalance (userId, db = database) {
  const lastTrans = Date.now() - oneWeekInSecs
  return db('accounts')
    .select()
    .where({ user_id: userId })
    .where('balance_updated_at', '>', lastTrans)
    .orderBy('balance_updated_at')
    .first()
}

async function calcBalanceDelta (userId, db = database) {
  const previous = await getPreviousBalance(userId, db)
  const current = await getCurrentBalance(userId, db)
  return current.balance - previous.balance
}

function getMedal (medalId, db = database) {
  return db('medals')
    .where({ id: medalId })
    .first()
}

async function awardMedal (userId, db = database) {
  const delta = await calcBalanceDelta(userId, db)
  const medalId = decideMedal(delta)
  const newMedal = await getMedal(medalId, db)
  return insertUsersMedals(userId, newMedal.id, db)
}

function decideMedal (delta) {
  return delta < 10 ? 3
    : delta >= 100 ? 2
      : delta >= 50 ? 1 : 'No medal for you'
}

function insertUsersMedals (userId, medalId, db = database) {
  return db('users_medals')
    .insert({
      user_id: userId,
      medal_id: medalId,
      awarded_at: Date.now()
    })
}

function getUsersMedals (userId, db = database) {
  return db('users_medals')
    .join('medals', 'users_medals.medal_id', 'medals.id')
    .where({ user_id: userId })
}

module.exports = {
  getPreviousBalance,
  getMedal,
  calcBalanceDelta,
  awardMedal,
  decideMedal,
  insertUsersMedals,
  getUsersMedals
}
