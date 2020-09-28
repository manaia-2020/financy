/* eslint-disable */
const knex = require('knex')

const config = require('../../knexfile').test
const { getTransactions, newTransaction, addRecurring, addTransaction, getCurrentBalance, updateBalance } = require('./bankDb')

const testDb = knex(config)
beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

test('test ', () => {
  expect(1).toBe(1)
})


describe('addTransaction', () => {
  const body = { amount: 12.95, date: '31/12/2020', accountSelect: 7, expenseName: 'Beer' }
  test('Adds a new transaction record for accountId7', () => {
    expect.assertions(2)
    return addTransaction(body, 3, null, testDb)
      .then((newTransId) => {
        return getTransactions(3, testDb)
      })
      .then((trans) => {
        expect(trans).toHaveLength(5)
        expect(trans[trans.length - 1].amount).toBe(12.95)
        return null
      })
  })

  test('Adds transaction then updates balance correctly', () => {
    expect.assertions(1)
    return addTransaction(body, 3, null, testDb)
      .then(() => {
        return getCurrentBalance(7, testDb)
      })
      .then((userBalance) => {
        expect(userBalance.balance).toBe(10012.95)
        return null
      })
  })
})

describe('newTransaction', () => {
  test('Adds a new recurring_transaction if recurring is true', () => {
    const body = { amount: 12.95, date: '31/12/2020', showRecurring: true, frequency: 7, accountSelect: 7, expenseName: 'Beer' }
    const userId = 2
    expect.assertions(2)
    return newTransaction(body, userId, testDb)
      .then((newTransId) => {
        return getTransactions(userId, testDb)
      })
      .then((trans) => {
        expect(trans).toHaveLength(5)
        expect(trans[trans.length - 1].recurring_transaction_id).toBe(4)
        return null
      })
  })
  test('Does Not add recurring_transaction if recurring is false', () => {
    const body = { amount: 12.95, date: '31/12/2020', showRecurring: false, accountSelect: 7, expenseName: 'Beer' }
    const userId = 2
    expect.assertions(2)
    return newTransaction(body, userId, testDb)
      .then((newTransId) => {
        return getTransactions(userId, testDb)
      })
      .then((trans) => {
        expect(trans).toHaveLength(5)
        expect(trans[1].recurring_transaction_id).toBeNull()
        return null
      })
  })
})

describe('getCurrentBalance', () => {
  test('Returns balance for accountId', () => {
    expect.assertions(1)
    return getCurrentBalance(7, testDb)
      .then((accountBalance) => {
        expect(accountBalance.balance).toBe(10000)
        return null
      })
  })

  test('Returns newest balance', () => {
    expect.assertions(2)
    return getCurrentBalance(7, testDb)
      .then((accountBalance) => {
        expect(accountBalance.balance).not.toBe(450.00)
        expect(accountBalance.balance_updated_at).not.toBe(1600990006895)
        return null
      })
  })
})

describe('updateBalance', () => {
  test('Updates a positive balance for a decimal', () => {
    expect.assertions(1)
    return updateBalance(15.95, 7, testDb)
      .then(() => {
        return getCurrentBalance(7, testDb)
      })
      .then((accountBalance) => {
        expect(accountBalance.balance).toBe(10015.95)
        return null
      })
  })
})

describe('udpdateBalance', () => {
  test('updated a negative balance', () => {
    expect.assertions(1)
    return updateBalance(-10.50, 7, testDb)
      .then(() => {
        return getCurrentBalance(7, testDb)
      })
      .then((accountBalance) => {
        expect(accountBalance.balance).toBe(9989.50)
        return null
      })
  })
})
