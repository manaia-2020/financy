/* eslint-disable jest/valid-title */
import accountsReducer from './accounts.reducer'
import {
  addAccount,
  getAccounts,
  deleteAccount,
  ADD_ACCOUNT,
  GET_ACCOUNTS,
  DELETE_ACCOUNT
} from '../actions/accounts.action'

describe('account reducer tests', () => {
  test(ADD_ACCOUNT, () => {
    expect.assertions(1)
    const account = { name: 'Jesus', balance: '🍷', user_id: 2 }

    const initialState = [{ name: 'Mary', balance: '🐑', user_id: 1 }]

    const expectedState = [...initialState, { ...account }]
    const action = addAccount(account)
    const actualState = accountsReducer(initialState, action)
    expect(actualState).toEqual(expectedState)
  })

  test(GET_ACCOUNTS, () => {
    expect.assertions(1)
    const accounts = [
      { name: 'Jesus', balance: '🍷', user_id: 1 },
      { name: 'Mary', balance: '🐑', user_id: 2 }
    ]

    const expectedState = [...accounts]
    const action = getAccounts(accounts)
    const actualState = accountsReducer([], action)
    expect(actualState).toEqual(expectedState)
  })

  test(DELETE_ACCOUNT, () => {
    expect.assertions(1)
    const accounts = [{ id: 1, name: 'Judas', balance: '🍷' }]

    const action = deleteAccount(1)
    const newState = accountsReducer(accounts, action)
    expect(newState).toEqual([])
  })
})
