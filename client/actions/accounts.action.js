export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'

export const addAccount = (account, id) => {
  return {
    type: ADD_ACCOUNT,
    account,
    id
  }
}

export const getAccounts = (accounts) => {
  return {
    type: GET_ACCOUNTS,
    accounts
  }
}

export const deleteAccount = (id) => {
  return {
    type: DELETE_ACCOUNT,
    id
  }
}
