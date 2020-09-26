export const ADD_USER_INFO = 'ADD_USER_INFO'

export function addUserInfo (userInfo) {
    return {
      type: ADD_USER_INFO,
      userInfo
    }
  }