import { addGoal, ADD_GOAL } from './goals.action'

describe('goals action tests', () => {
  test('addGoal', () => {
    const date = Date.now()
    const goal = {
      name: 'pin jesus to cross',
      goal_date: date,
      amount: '$23.00'
    }

    const action = addGoal(goal, 2)

    expect.assertions(3)
    expect(action.type).toBe(ADD_GOAL)
    expect(action.payload.id).toBe(2)
    expect(action.payload.goal).toEqual(goal)
  })
})
