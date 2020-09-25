const request = require('supertest')
const server = require('../server')

const { awardMedal, getUsersMedals } = require('../database/medalsDb')

jest.mock('../database/medalsDb', () => ({
  awardMedal: jest.fn(),
  getUsersMedals: jest.fn()
}))

describe('GET /:id/medals', () => {
  test('Status 200', () => {
    expect.assertions(1)
    awardMedal.mockImplementation(() => Promise.resolve())
    return request(server)
      .get('/api/v1/medals/2/show')
      .then((res) => {
        expect(res.status).toBe(200)
        return null
      })
  })
})
