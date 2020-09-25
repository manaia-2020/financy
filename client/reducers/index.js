import { combineReducers } from 'redux'
import goals from './goals.reducer'
import accounts from './accounts'

const reducers = combineReducers({
  goals,
  accounts
})

export default reducers
