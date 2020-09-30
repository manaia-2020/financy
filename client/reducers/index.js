import { combineReducers } from 'redux'
import goals from './goals.reducer'
import accounts from './accounts.reducer'
import waiting from './waiting.reducer'
import addUserInfo from './addUserInfo.reducer'
import rewards from './rewards.reducer'
import content from './content.reducer'
import page from './page.reducer'

const reducers = combineReducers({
  goals,
  accounts,
  waiting,
  addUserInfo,
  rewards,
  content,
  page
})

export default reducers
