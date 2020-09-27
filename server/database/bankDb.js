const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const database = knex(config)

function getTransactions (userId, db = database) {
  return db('transactions')
    .where({ user_id: userId })
    .select()
}

function newTransaction (body, id, db = database) {
  const { showRecurring, frequency } = body
  if (showRecurring) {
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
  const { amount, date, expenseName, accountSelect } = body
  return db('transactions')
    .insert({
      amount,
      date,
      user_id: userId,
      name: expenseName,
      account_id: accountSelect,
      recurring_transaction_id: transId
    })
    .then(() => {
      return updateBalance(amount, accountSelect, userId, db)
    })
}

function updateBalance (amount, accountId, userId, db = database) {
  return db('accounts')
    .insert({
      userId,
      balance_updated_at: Date.now()
    })
    .where({
      id: accountId
    })
    .increment({ balance: amount })
}

function getCurrentBalance (userId, accountId, db = database) {
  return db('balance_history')
    .join('accounts', 'accounts.id', 'account_id')
    .where({ user_id: userId })
    .where({ account_id: accountId })
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
