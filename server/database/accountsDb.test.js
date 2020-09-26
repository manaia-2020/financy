/* eslint-disable */
const knex = require('knex')
const { getAccountDetails } = require('./accountsDb')
const config = require('../../knexfile').test

const db = require('./accountsDb')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('check if function returns accounts', () => {
  expect.assertions(3)
  return db.getAccountDetails(1, testDb)
    .then((acc) => {
      expect(acc).toHaveLength(1)
      expect(acc[0].id).toBe(1)
      expect(acc[0].balance).toBe(10000)
      return null
    })
})


test('adds new accounts details to db', () => {
  const data = { name: 'Adventure Account', balance: 10 }
  expect.assertions(1)
  return db.addAccountDetails(data, testDb)
    .then((newAcc) => {
      expect(newAcc[0]).toBe(8)
    })
})

test('tests that deleteAccount removes account from db', () => {
  expect.assertions(1)
  return db.deleteAccount(1, testDb)
    .then(accountDeleted => {
      expect(accountDeleted).toBe(1)
    })
})

