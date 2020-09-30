import { SET_MAIN_CONTENT } from '../actions/content.action'

const initialState = 'Dashboard'

export default function pageReducer (state = initialState, action) {
  switch (action.type) {
    case SET_MAIN_CONTENT:
      switch (action.payload.type) {
        case 'account':
          return 'Accounts'

        case 'goals':
          return 'Goals'

        case 'transactions':
          return 'Transactions'

        case 'rewards':
          return 'Rewards'
      }
      break

    default:
      return state
  }
}
