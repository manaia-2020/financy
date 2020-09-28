import { FETCH_GOALS_BEGIN, FETCH_GOALS_SUCCESS } from '../actions/goals.action'

const initialState = false

export default function waitingReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_GOALS_BEGIN:
      return true

    case FETCH_GOALS_SUCCESS:
      return false

    default:
      return state
  }
}
