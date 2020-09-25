/* eslint-disable */

const knex = require('knex')
const config = require('../../knexfile').test

const db = require('./db')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('saveNewUser adds user to db', () => {
  const user = { username: 'welovetesting@gmail.com', password: 'test' }
  return db.saveNewUser(user, testDb)
    .then(() => db.getUserByName(user.username, testDb))
    .then(res => {
      expect(res.username).toBe('welovetesting@gmail.com')
      return
    })
})

describe('checks to see if email already exists when trying to register', () => {
  test('Check function returns TRUE if email exists', () => {
    expect.assertions(1)
    return db.userExists('bruce@diehard.com', testDb)
      .then((result) => {
        expect(result).toBe(true)
        return
      })
  })

  test('Check function returns FALSE if email does not exists', () => {
    expect.assertions(1)
    return db.userExists('idontexist@diehard.com', testDb)
      .then((result) => {
        expect(result).toBe(false)
        return
      })
  })
})

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
      expect(newAcc[0]).toBe(3)
    })
})

