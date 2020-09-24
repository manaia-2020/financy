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
