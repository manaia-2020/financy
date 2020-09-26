const knex = require('knex')
const config = require('../../knexfile').test
const { getAllTransForUserAccount } = require('./transactionsDb')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

describe('getTransForUser', () => {
  test('Returns all transactions for userId and accountId', () => {
    const userId = 2
    const accountId = 6
    expect.assertions(2)
    return getAllTransForUserAccount(userId, accountId, testDb)
      .then(trans => {
        expect(trans).toHaveLength(4)
        expect(trans[0].name).toBe('BK')
        return null
      })
  })
})
