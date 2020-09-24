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

test('getUserByName get the user using the email address', () => {
  const email = { username: 'testing@gmail.com' }
  return db.getUserByName(email, testDb)
    .then(res => {
      expect(res.username).toBe(email)
    })
})
