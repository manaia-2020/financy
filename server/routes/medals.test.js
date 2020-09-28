const request = require('supertest')
const server = require('../server')

const { awardMedal, getUsersMedals } = require('../database/medalsDb')

jest.mock('../database/medalsDb', () => ({
  awardMedal: jest.fn(),
  getUsersMedals: jest.fn()
}))

describe('GET /:userId/:accountId/medals', () => {
  test('Status 200', () => {
    expect.assertions(1)
    awardMedal.mockImplementation(() => Promise.resolve())
    return request(server)
      .get('/api/v1/medals/3/7/show')
      .then((res) => {
        expect(res.status).toBe(200)
        return null
      })
  })
  test('Medals are correctly returned', () => {
    getUsersMedals.mockImplementation(() => Promise.resolve({ user_id: 2, medal_id: 1, name: 'Strong Saver' }))
    return request(server)
      .get('/api/v1/medals/2/2/show')
      .then((res) => {
        expect(res.body.medals.name).toBe('Strong Saver')
        return null
      })
  })
})
