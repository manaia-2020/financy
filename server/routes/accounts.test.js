import request from 'supertest'
import { deleteAccount } from '../database/accountsDb'

import server from '../server'

jest.mock('../database/accountsDb', () => ({
  deleteAccount: jest.fn()
}))

//need to test the other functions as well

describe('DELETE/ api/v1/accounts/:id', () => {
  test('calls deleteAccount db function', () => {
    deleteAccount.mockImplementation(() => Promise.resolve(1))
    expect.assertions(3)
    return request(server)
      .delete('/api/v1/accounts/1')
      .then(res => {
        expect(deleteAccount).toHaveBeenCalled()
        expect(deleteAccount).toHaveBeenCalledWith(1)
        expect(res.status).toBe(200)
        return null
      })
  })
})
