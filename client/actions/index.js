export const ADD_USER_INFO = 'ADD_USER_INFO'
export const SET_REWARDS = 'SET_REWARDS'

export function addUserInfo (userInfo) {
  return {
    type: ADD_USER_INFO,
    userInfo
  }
}

export function setRewards (rewards) {
  return {
    type: SET_REWARDS,
    rewards
  }
}
