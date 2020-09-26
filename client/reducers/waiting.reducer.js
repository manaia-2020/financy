import { FETCH_GOALS_BEGIN, FETCH_GOALS_SUCCESS, FETCH_GOALS_FAILURE } from '../actions/goals.action'

const initialState = false

export default function waitingReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_GOALS_BEGIN:
      return true

    case FETCH_GOALS_SUCCESS:
    case FETCH_GOALS_FAILURE:
      return false

    default:
      return state
  }
}
