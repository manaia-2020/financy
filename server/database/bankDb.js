const knex = require('knex')
const config = require('../../knexfile').development
const database = knex(config)

function getTransactions (userId, db = database) {
  return db('transactions')
    .where({ user_id: userId })
    .select()
}

function newTransaction (body, id, db = database) {
  const { recurring, frequency } = body
  if (recurring) {
    return addRecurring(frequency, db)
      .then((transId) => {
        return addTransaction(body, id, transId[0], db)
      })
  } else {
    return addTransaction(body, id, null, db)
  }
}

function addRecurring (frequency, db = database) {
  return db('recurring_transactions')
    .insert({ frequency })
}

function addTransaction (body, userId, transId, db = database) {
  const { amount, date } = body
  return db('transactions')
    .insert({
      amount,
      date,
      user_id: userId,
      recurring_transaction_id: transId
    })
    .then(() => {
      return updateBalance(amount, userId, db)
    })
}

function updateBalance (amount, userId, db = database) {
  return db('accounts')
    .insert({
      userId,
      balance_updated_at: Date.now()
    })
    .increment({ balance: amount })
}

function getCurrentBalance (userId, db = database) {
  return db('accounts')
    .where({ user_id: userId })
    .orderBy('balance_updated_at', 'desc')
    .first()
}

module.exports = {
  getTransactions,
  newTransaction,
  addRecurring,
  addTransaction,
  updateBalance,
  getCurrentBalance
}
