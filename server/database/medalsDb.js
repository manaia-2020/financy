const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]

const { getCurrentBalance } = require('./bankDb')
const database = knex(config)

const oneWeekInSecs = 1000 * 60 * 60 * 24 * 7

function getPreviousBalance (userId, accountId, db = database) {
  const lastTrans = Date.now() - oneWeekInSecs
  return db('balance_history')
    .join('accounts', 'accounts.id', 'account_id')
    .select('*', 'balance_history.balance as balance')
    .where({ user_id: userId })
    .where({ account_id: accountId })
    .where('balance_updated_at', '>', lastTrans)
    .orderBy('balance_updated_at')
    .first()
}

async function calcBalanceDelta (userId, accountId, db = database) {
  const previous = await getPreviousBalance(userId, accountId, db)
  const current = await getCurrentBalance(accountId, db)
  return current.balance - previous.balance
}

function getMedal (medalId, db = database) {
  return db('medals')
    .where({ id: medalId })
    .first()
}

async function awardMedal (userId, accountId, db = database) {
  const delta = await calcBalanceDelta(userId, accountId, db)
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
  return userMedalExists(userId, medalId, db)
    .then((medals) => {
      if (medals.length === 0) {
        return db('users_medals')
          .insert({
            user_id: userId,
            medal_id: medalId,
            awarded_at: Date.now()
          })
      } else {
        return null
      }
    })
}

function userMedalExists (userId, medalId, db = database) {
  return db('users_medals')
    .join('medals', 'users_medals.medal_id', 'medals.id')
    .where({ user_id: userId })
    .where({ medal_id: medalId })
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
