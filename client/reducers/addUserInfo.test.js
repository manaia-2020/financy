/* eslint-disable jest/valid-title */
import addUSerInfoReducer from './addUserInfo.reducer'
import {
  addUserInfo,
  ADD_USER_INFO
} from '../actions'

test(ADD_USER_INFO, () => {
  expect.assertions(1)
  const userInfo = [
    { id: 1, username: 'test@gmail.com' }
  ]

  const expectedState = [...userInfo]
  const action = addUserInfo(userInfo)
  const actualState = addUSerInfoReducer([], action)
  expect(actualState).toEqual(expectedState)
})
