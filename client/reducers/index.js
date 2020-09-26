import { combineReducers } from 'redux'
import goals from './goals.reducer'
import accounts from './accounts.reducer'
import waiting from './waiting.reducer'
import addUserInfo from './addUserInfo'

const reducers = combineReducers({
  goals,
  accounts,
  waiting,
  addUserInfo
})

export default reducers
