import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '../reducers/index'

const createStore = (preloadedState = {}) =>
  reduxCreateStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))

export default createStore
