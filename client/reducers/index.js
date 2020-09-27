import { combineReducers } from 'redux'
import goals from './goals.reducer'
import accounts from './accounts.reducer'
import waiting from './waiting.reducer'
import addUserInfo from './addUserInfo'
import setRewards from './rewards'

const reducers = combineReducers({
  goals,
  accounts,
  waiting,
  addUserInfo,
  setRewards
})

export default reducers
