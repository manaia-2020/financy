import { ADD_USER_INFO } from '../actions'

const InitialUserInfo = {
  id: '',
  username: ''
}

//where are my tests?
function addUserInfo (state = InitialUserInfo, action) {
  switch (action.type) {
    case ADD_USER_INFO:
      return action.userInfo
    default:
      return state
  }
}

export default addUserInfo
