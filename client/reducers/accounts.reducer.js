import { GET_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT } from '../actions/accounts.action'

const initialState = []

export default function accountsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.accounts

    case ADD_ACCOUNT:
      return [...state, action.account]
    case DELETE_ACCOUNT:
      return state.filter((account) => account.id !== action.id)
    default:
      return state
  }
}
