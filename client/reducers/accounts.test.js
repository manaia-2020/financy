/* eslint-disable jest/valid-title */
import accountsReducer from './accounts.reducer'
import { addAccount, ADD_ACCOUNT } from '../actions/accounts.action'

describe('account reducer tests', () => {
  test(ADD_ACCOUNT, () => {
    expect.assertions(1)
    const account = {
      name: 'John',
      balance: '21.05'
    }

    const initialState = [{
      name: 'Mary',
      balance: '50000.05',
      user_id: 1
    }]

    const expectedState = [{
      name: 'Mary',
      balance: '50000.05',
      user_id: 1
    },
    {
      name: 'John',
      balance: '21.05',
      user_id: 2
    }]

    const action = addAccount(account, 2)

    const actualState = accountsReducer(initialState, action)

    expect(actualState).toEqual(expectedState)
  })
})
