import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import prodState from './state'
import devState from '~/test/stateFixtures/dev'

const crx = () => {
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (next) => next
}

export const configureStore = () => {
  let store
  const middleware = applyMiddleware(thunk)
  if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, devState, middleware)
  } else if (process.env.NODE_ENV === 'production') {
    store = createStore(rootReducer, prodState, middleware)
  }
  return { store }
}