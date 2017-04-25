import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import prodState from './state'
import devState from '~/test/stateFixtures/dev'
import onboarding from '~/test/stateFixtures/onboarding'

const env = process.env.NODE_ENV

const crx = () => {
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (next) => next
}

const logger = ({getState}) => (next) => (action) => {
  console.log(action, getState())
  return next(action)
}

export const configureStore = (initialState = prodState) => {
  let store
  if (env === 'development')
    store = createStore(
      rootReducer, 
      onboarding, 
      applyMiddleware(thunk, logger)
    )
  else if (env === 'test')
    store = createStore(
      rootReducer, 
      Array.isArray(initialState) ? initialState.slice(-1).pop() : initialState, 
      applyMiddleware(thunk)
    )
  else if (env === 'production')
    store = createStore(
      rootReducer, 
      prodState, 
      applyMiddleware(thunk)
    )
  
  return { store }
}