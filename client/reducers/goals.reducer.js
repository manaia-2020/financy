import { ADD_GOAL, FETCH_GOALS_FAILURE, FETCH_GOALS_SUCCESS } from '../actions/goals.action'

const initialState = []

export default function goalsReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, {
        id: Math.random().toString(36).substring(7),
        name: action.payload.goal.name,
        goal_date: action.payload.goal.date,
        amount: action.payload.goal.amount,
        user_id: action.payload.id
      }]

    case FETCH_GOALS_SUCCESS:
      return action.payload.goals

    //this case is unecessary (same as default)
    case FETCH_GOALS_FAILURE:
      return state

    default:
      return state
  }
}
