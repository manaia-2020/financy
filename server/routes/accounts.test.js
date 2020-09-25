import request from 'supertest'
import { getAccountDetails, addAccountDetails } from '../database/db'
import server from '../server'

jest.mock('../database/db', () => ({
  getAccountDetails: jest.fn(),
  addAccountDetails: jest.fn()
}))

describe('GET/ api/v1.accounts/:id', () => {
  test('returns accounts based off userId', () => {
    getAccountDetails.mockImplementation(() => Promise.resolve(
      [
        { id: 1, name: 'Savings', balance: 10000.00, balance_updated_at: Date.now(), user_id: 1 },
        { id: 2, name: 'Spendings', balance: 500.00, balance_updated_at: Date.now(), user_id: 2 }
      ]
    ))
    expect.assertions(2)
    return request(server)
      .get('/api/v1/accounts/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.text).toMatch(/Savings/)
        return null
      })
  })
})

describe('POST/ api/v1/accounts/:id', () => {
  const data = {
    user_id: 1,
    name: 'Daily Spending Account',
    balance: 2000,
    date: Date.now()
  }
  test('check if account data is posted to db', () => {
    addAccountDetails.mockImplementation(() => Promise.resolve())
    expect.assertions(3)
    return request(server)
      .post('/api/v1/accounts/:id')
      .send(data)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(addAccountDetails).toHaveBeenCalled()
        expect(res.text).toMatch(/Spending/)
        return null
      })
  })
})
