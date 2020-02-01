import { combineReducers } from 'redux'
import errors from './errors'
import session from './session'

const rootReducer = combineReducers({
  errors,
  session,
})

export default rootReducer
