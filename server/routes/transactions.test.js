const request = require('supertest')
const server = require('../server')
const { getAllTransForUserAccount } = require('../database/transactionsDb')

jest.mock('../database/transactionsDb', () => ({
  getAllTransForUserAccount: jest.fn()
}))

describe('GET /api/v1/transactions/:userId/:accountId', () => {
  getAllTransForUserAccount.mockImplementation(() => Promise.resolve())
  test('Returns 200', () => {
    return request(server)
      .get('/api/v1/transactions/2/6')
      .then((res) => {
        expect(res.status).toBe(200)
        return null
      })
  })
  test('Returns 500 DB Error', () => {
    expect.assertions(2)
    getAllTransForUserAccount.mockImplementation(() => Promise.reject(new Error('DB Error')))
    return request(server)
      .get('/api/v1/transactions/2/6')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toMatch(/Database Error/)
        return null
      })
  })
})
