import { ADD_GOAL, FETCH_GOALS_SUCCESS, DELETE_GOAL } from '../actions/goals.action'

const initialState = []

export default function goalsReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.payload.goal]

    case FETCH_GOALS_SUCCESS:
      return action.payload.goals

    case DELETE_GOAL:
      return state.filter((goal) => goal.id !== action.payload.id)

    default:
      return state
  }
}
