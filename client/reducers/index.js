import { combineReducers } from 'redux'
import accounts from './accounts'

import goals from './goals.reducer'

const reducers = combineReducers({
  goals
})

export default reducers
