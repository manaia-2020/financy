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

function addTransaction (body, id, transId, db = database) {
  const { amount, date } = body
  return db('transactions')
    .insert({
      amount,
      date,
      user_id: id,
      recurring_transaction_id: transId
    })
}

module.exports = {
  getTransactions,
  newTransaction,
  addRecurring,
  addTransaction
}
