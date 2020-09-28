/* eslint-disable promise/always-return */
import request from 'supertest'
import { saveNewGoal, getAllGoalsByUserId } from '../database/goalsDb'
import server from '../server'

jest.mock('../database/goalsDb', () => ({
  saveNewGoal: jest.fn(),
  getAllGoalsByUserId: jest.fn()
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

describe('GET/ api/v1/goals/:id', () => {
  const id = 2
  test('check if status 200', () => {
    getAllGoalsByUserId.mockImplementation(() => Promise.resolve())
    return request(server)
      .get(`/api/v1/goals/${id}`)
      .then((res) => {
        expect.assertions(1)
        expect(res.status).toBe(201)
        return null
      })
  })

  test('goals are returned correctly', () => {
    expect.assertions(4)
    getAllGoalsByUserId.mockImplementation(() => Promise.resolve([{
      id: 1,
      name: 'buy a house',
      goal_date: 1600992000000,
      amount: 2344,
      user_id: 2
    },
    {
      id: 2,
      name: 'buy a dog',
      goal_date: 1530921600000,
      amount: 12.42,
      user_id: 2
    }
    ]
    ))

    return request(server)
      .get(`/api/v1/goals/${id}`)
      .then((res) => {
        res.body.forEach(goal => {
          expect(goal.user_id).toBe(id)
        })
        expect(res.body[0].name).toBe('buy a house')
        expect(res.body[1].name).toBe('buy a dog')
      })
  })
})
