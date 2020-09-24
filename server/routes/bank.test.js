import request from 'supertest'
import server from '../server'

import { getTransactions } from '../database/bankDb'

jest.mock('../database/bankDb', () => ({
  getTransactions: jest.fn()
}))

describe('GET /:id/transactions', () => {
  test('Returns 200 and transactions', () => {
    expect.assertions(2)
    getTransactions.mockImplementation(() => Promise.resolve(
      [
        { id: 1, amount: 25.00, date: Date.now(), user_id: 1, transaction_type_id: 2 },
        { id: 2, amount: 25.00, date: Date.now(), user_id: 2, transaction_type_id: 4, recurring_transaction_id: 1 }
      ]
    ))
    return request(server)
      .get('/api/v1/bank/2/transactions')
      .expect(200)
      .then((res) => {
        expect(res.body.transactions).toHaveLength(2)
        expect(getTransactions).toHaveBeenCalledWith(2)
      })
  })

  test('Reject returns 500 Database Error', () => {
    expect.assertions(2)
    getTransactions.mockImplementation(() => Promise.reject('DB Error'))
    return request(server)
      .get('/api/v1/bank/3/transactions')
      .then(res => {
        expect(res.status).toBe(500)
        expect(res.text).toMatch(/Database Error/)
      })
  })
})
