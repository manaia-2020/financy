import { GET_ACCOUNTS, ADD_ACCOUNT } from '../actions/index'

const initialState = []

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.account

    case ADD_ACCOUNT:
      return [...state, {
        name: action.account.name,
        balance: action.account.balance,
        user_id: action.id
      }]

    default:
      return state
  }
}