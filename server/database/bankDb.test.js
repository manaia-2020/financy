const knex = require('knex')
const config = require('../../knexfile').test
const { getTransactions, newTransactions, addRecurring, addTransaction } = require('./bankDb')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('getTransactions', () => {
  test('Returns all transactions', () => {
    expect.assertions(3)
    return getTransactions(1, testDb)
      .then((trans) => {
        expect(trans).toHaveLength(1)
        expect(trans[0].amount).toBe(25.00)
        expect(trans[0].id).toBe(1)
      })
  })
})

describe('addRecurring', () => {
  test('Adds a record to recurring_transactions table', () => {
    expect.assertions(1)
    return addRecurring(7, testDb)
      .then((transId) => {
        expect(transId[0]).toBe(4)
      })
  })
})

describe('addTransaction', () => {
  test('Adds a new transaction record for userId 2', () => {
    expect.assertions(2)
    const body = { amount: 12.95, date: '31/12/2020' }
    return addTransaction(body, 2, null, testDb)
      .then((newTransId) => {
        return getTransactions(2, testDb)
          .then((trans) => {
            expect(trans).toHaveLength(2)
            expect(trans[1].amount).toBe(12.95)
          })
      })
  })
})
