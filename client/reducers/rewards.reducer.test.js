/* eslint-disable jest/valid-title */
import rewardsReducer from './rewards.reducer'
import {
  setRewards,
  SET_REWARDS
} from '../actions'

test(SET_REWARDS, () => {
  expect.assertions(1)
  const rewards = [
    { id: 1, name: 'Top Saver' },
    { id: 2, name: 'Money Saving Machine' }
  ]

  const expectedState = [...rewards]
  const action = setRewards(rewards)
  const actualState = rewardsReducer([], action)
  expect(actualState).toEqual(expectedState)
})
