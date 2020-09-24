export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const GET_ACCOUNTS = 'GET_ACCOUNTS'

export const addAccount = (account, id) => ({
  type: ADD_ACCOUNT,
  account
})

export const getAccounts = (accounts) => ({
  type: GET_ACCOUNTS,
  accounts
})