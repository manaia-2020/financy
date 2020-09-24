const knex = require('knex')
const config = require('../../knexfile').test

const db = require('./db')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())


test('saveNewUser adds user to db', () => {
  const user = { username: 'welovetesting@gmail.com', password: 'test' }
  return db.saveNewUser(user, testDb)
  .then(() => {
    return db.getUserByName(user.username, testDb)
    .then(res => {
      expect(res.username).toBe('welovetesting@gmail.com')
    })
  })
})

describe('checks to see if email already exists when trying to register', () => {
  test('Check function returns TRUE if email exists', () => {
    expect.assertions(1)
    return db.userExists('bruce@diehard.com', testDb)
      .then((result) => {
        expect(result).toBe(true)
      })
  })

  test('Check function returns FALSE if email does not exists', () => {
    expect.assertions(1)
    return db.userExists('idontexist@diehard.com', testDb)
      .then((result) => {
        expect(result).toBe(false)
      })
  })
})
