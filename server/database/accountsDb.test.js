const knex = require('knex')
const config = require('../../knexfile').test

const db = require('./accountsDb')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('tests that deleteAccount removes account from db', () => {
  expect.assertions(1)
  return db.deleteAccount(1, testDb)
    .then(accountDeleted => {
      expect(accountDeleted).toBe(1)
      return null
    })
})
