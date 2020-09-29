import { combineReducers } from 'redux'
import goals from './goals.reducer'
import accounts from './accounts.reducer'
import waiting from './waiting.reducer'
import addUserInfo from './addUserInfo.reducer'
import rewards from './rewards.reducer'

const reducers = combineReducers({
  goals,
  accounts,
  waiting,
  addUserInfo,
  rewards
})

export default reducers
