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
  return getMedal(medalId, db)
}

function decideMedal (delta) {
  return delta < 10 ? 3
    : delta >= 100 ? 2
      : delta >= 50 ? 1 : 'No medal for you'
}

module.exports = {
  getPreviousBalance,
  getMedal,
  calcBalanceDelta,
  awardMedal,
  decideMedal
}
