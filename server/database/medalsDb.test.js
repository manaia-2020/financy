const knex = require('knex')
const config = require('../../knexfile').test
const { getPreviousBalance, calcBalanceDelta, getMedal, decideMedal, insertUsersMedals, getUsersMedals } = require('./medalsDb')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('getPreviousBalance', () => {
  test('Gets the oldest balance within 1 week', () => {
    expect.assertions(1)
    return getPreviousBalance(3, 7, testDb)
      .then((oldestBalance) => {
        expect(oldestBalance.balance).toBe(450)
        return null
      })
  })
})

describe('getMedal', () => {
  test('Returns correct medal from Db', () => {
    expect.assertions(1)
    const medalId = 2
    return getMedal(medalId, testDb)
      .then((medal) => {
        expect(medal.name).toBe('Best Saver')
        return null
      })
  })
})

describe('calcBalanceDelta', () => {
  test('Calculates correct change in balance for userId 3', async () => {
    const userId = 3
    const accountId = 7
    const delta = await calcBalanceDelta(userId, accountId, testDb)
    expect(delta).toBe(9550)
  })
})

describe('decideMedal', () => {
  test('returns the correct medal for delta 50', () => {
    const delta = 50
    const medalId = decideMedal(delta)
    expect(medalId).toBe('No medal for you')
  })

  test('returns the correct medal for delta 150', () => {
    const delta = 150
    const medalId = decideMedal(delta)
    expect(medalId).toBe(1)
  })

  test('returns the correct medal for delta -10', () => {
    const delta = -10
    const medalId = decideMedal(delta)
    expect(medalId).toBe(3)
  })

  test('returns the correct medal for delta 20', () => {
    const delta = 20
    const medalId = decideMedal(delta)
    expect(medalId).toMatch(/No medal for you/)
  })
})

describe('insertUsersMedals', () => {
  const userId = 2
  const medalId = 2
  test('Inserts a new medal', () => {
    expect.assertions(1)
    return insertUsersMedals(userId, medalId, testDb)
      .then((medals) => {
        expect(medals).toHaveLength(1)
        return null
      })
  })

  test("doesn't insert a medal if user already has medal", () => {
    expect.assertions(1)
    return insertUsersMedals(userId, 3, testDb)
      .then((medals) => {
        expect(medals).toBeNull()
        return null
      })
  })

  test('Inserts correct medal name for user', () => {
    expect.assertions(2)
    return insertUsersMedals(userId, medalId, testDb)
      .then(() => {
        return getUsersMedals(userId, testDb)
      })
      .then((medals) => {
        expect(medals).toHaveLength(2)
        expect(medals[1].name).toBe('Best Saver')
        return null
      })
  })
})

describe('getUsersMedals', () => {
  test('Returns correct medals for userId', () => {
    expect.assertions(3)
    const userId = 1
    return getUsersMedals(userId, testDb)
      .then((medals) => {
        expect(medals).toHaveLength(2)
        expect(medals[0].name).toBe('Strong Saver')
        expect(medals[1].name).toMatch(/Best Saver/)
        return null
      })
  })
})
