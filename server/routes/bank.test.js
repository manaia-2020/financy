const request = require('supertest')
const server = require('../server')

const { newTransaction, getTransactions, addRecurring, addTransaction } = require('../database/bankDb')

jest.mock('../database/bankDb', () => ({
  getTransactions: jest.fn(),
  newTransaction: jest.fn(),
  addRecurring: jest.fn(),
  addTransaction: jest.fn()
}))

describe('GET /:id/transactions', () => {
  test('Returns 200 and transactions', () => {
    getTransactions.mockImplementation(() => Promise.resolve(
      [{ id: 2, amount: 25.00, date: Date.now(), user_id: 2, transaction_type_id: 4, recurring_transaction_id: 1 }]
    ))
    expect.assertions(1)
    return request(server)
      .get('/api/v1/bank/2/transactions/')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(bankDb.getTransactions).toHaveBeenCalledWith(2)
      })
  })
})

describe('POST /:id/addTransaction', () => {
  test('Returns 200', () => {
    return
  })
})
