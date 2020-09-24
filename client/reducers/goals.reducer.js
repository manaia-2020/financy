import { ADD_GOAL } from '../actions/goals.action'

const initialState = []

export default function goalsReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, {
        name: action.payload.goal.name,
        goal_date: action.payload.goal.date,
        user_id: action.payload.id
      }]

    default:
      return state
  }
}
