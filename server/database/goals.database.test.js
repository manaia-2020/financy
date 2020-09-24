/* eslint-disable */

const knex = require('knex')
const config = require('../../knexfile').test

const db = require('./db')
const { saveNewGoal } = require('./goals.database')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

describe('saveNewGoal', () => {
  test('adds new goal to database', () => {
    const data = {
      name: "ten pin",
      date: "1999-02-12",
      id: 2
    }
  
    expect.assertions(1)
  
    return saveNewGoal(data, testDb)
      .then((id) => {
        expect(id[0]).toBe(3)
      })
  })
})
