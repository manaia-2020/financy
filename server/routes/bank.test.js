import request from 'supertest'
import server from '../server'

import { newTransaction } from '../database/bankDb'

jest.mock('../database/bankDb', () => ({
  getTransactions: jest.fn(),
  newTransaction: jest.fn()
}))

describe('POST /:id/addTransaction', () => {
  const body = {
    user_id: 2,
    amount: 10.95,
    date: Date.now(),
    recurring: false
  }

  test('Returns Status 201 and calls db function with correct args', () => {
    newTransaction.mockImplementation(() => Promise.resolve())
    expect.assertions(2)
    return request(server)
      .post('/api/v1/bank/2/addTransaction')
      .send(body)
      .then(res => {
        expect(res.status).toBe(201)
        expect(newTransaction).toHaveBeenCalledWith(body, 2)
        return null
      })
  })

  test('Returns 500 with DB error', () => {
    newTransaction.mockImplementation(() => Promise.reject(new Error('DB Error')))
    expect.assertions(2)
    return request(server)
      .post('/api/v1/bank/2/addTransaction')
      .send(body)
      .then(res => {
        expect(res.status).toBe(500)
        expect(res.text).toMatch(/Database Error/)
        return null
      })
  })
})
