/* eslint-disable jest/valid-title */
import goalsReducer from './goals.reducer'
import { addGoal, ADD_GOAL, fetchGoalsSuccess, FETCH_GOALS_FAILURE, FETCH_GOALS_SUCCESS, fetchGoalsFailure } from '../actions/goals.action'

describe('goals reducer tests', () => {
  test(ADD_GOAL, () => {
    const date = Date.now()
    const id = 2
    const goal = {
      name: 'pin jesus to cross',
      date: date,
      amount: '$23.00'
    }

    const initialState = []

    const expectedState = [{
      name: 'pin jesus to cross',
      goal_date: date,
      amount: '$23.00',
      user_id: id
    }]

    const action = addGoal(goal, id)

    const actualState = goalsReducer(initialState, action)

    expect.assertions(1)
    expect(actualState).toEqual(expectedState)
  })

  test(FETCH_GOALS_SUCCESS, () => {
    const goals = ['goal 1', 'goal 2']
    const initialState = []
    const expectedState = goals

    const action = fetchGoalsSuccess(goals)
    const actualState = goalsReducer(initialState, action)

    expect(actualState).toEqual(expectedState)
  })

  test(FETCH_GOALS_FAILURE, () => {
    const error = 'no goals'
    const initialState = []
    const expectedState = initialState

    const action = fetchGoalsFailure(error)
    const actualState = goalsReducer(initialState, action)

    expect(actualState).toBe(expectedState)
  })
})
