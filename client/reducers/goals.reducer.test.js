/* eslint-disable jest/valid-title */
import goalsReducer from './goals.reducer'
import {
  addGoal,
  fetchGoalsSuccess,
  ADD_GOAL,
  FETCH_GOALS_SUCCESS
} from '../actions/goals.action'

describe('goals reducer tests', () => {
  test(ADD_GOAL, () => {
    const date = Date.now()
    const goal = {
      name: 'pin jesus to cross',
      date: date,
      amount: '$23.00'
    }

    const initialState = []

    const expectedState = [{
      name: 'pin jesus to cross',
      goal_date: date,
      amount: '$23.00'
    }]

    const action = addGoal(goal)

    const actualState = goalsReducer(initialState, action)

    expect.assertions(1)
    expect(actualState[0].name).toBe(expectedState[0].name)
  })

  test(FETCH_GOALS_SUCCESS, () => {
    const goals = ['goal 1', 'goal 2']
    const initialState = []
    const expectedState = goals

    const action = fetchGoalsSuccess(goals)
    const actualState = goalsReducer(initialState, action)

    expect(actualState).toEqual(expectedState)
  })
})
