import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import prodState from './state'
import devState from '~/test/stateFixtures/dev'

const env = process.env.NODE_ENV

const crx = () => {
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (next) => next
}

export const configureStore = (initialState = prodState) => {
  let store
  const middleware = applyMiddleware(thunk)
  if (env === 'development')
    store = createStore(
      rootReducer, 
      devState, 
      middleware
    )
  else if (env === 'test')
    store = createStore(
      rootReducer, 
      Array.isArray(initialState) ? initialState.slice(-1).pop() : initialState, 
      middleware
    )
  else if (env === 'production')
    store = createStore(
      rootReducer, 
      prodState, 
      middleware
    )
  
  return { store }
}