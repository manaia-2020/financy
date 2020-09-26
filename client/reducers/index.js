import { combineReducers } from 'redux'
import goals from './goals.reducer'
import accounts from './accounts.reducer'
import waiting from './waiting.reducer'

const reducers = combineReducers({
  goals,
  accounts,
  waiting
})

export default reducers
