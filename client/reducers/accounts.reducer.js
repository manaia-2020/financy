import { GET_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT } from '../actions/accounts.action'

const initialState = []

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.accounts

    case ADD_ACCOUNT:
      return [...state, {
        name: action.account.name,
        balance: action.account.balance,
        user_id: action.id
      }]
    case DELETE_ACCOUNT:
      return state.filter((account) => account.id !== action.id)
    default:
      return state
  }
}
