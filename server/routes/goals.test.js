/* eslint-disable promise/always-return */
import request from 'supertest'
import { saveNewGoal } from '../database/goals.database'
import server from '../server'

jest.mock('../database/goals.database', () => ({
  saveNewGoal: jest.fn()
}))

describe('POST/ api/v1/goals', () => {
  test('check if called with correct data', () => {
    saveNewGoal.mockImplementation(() => Promise.resolve(3))

    const data = {
      name: 'ten pin',
      date: '1999-02-12',
      amount: '$32.00',
      id: 2
    }

    expect.assertions(2)

    return request(server)
      .post('/api/v1/goals')
      .send(data)
      .then(() => {
        expect(saveNewGoal).toHaveBeenCalled()
        expect(saveNewGoal).toHaveBeenCalledWith(data)
      })
  })
})
