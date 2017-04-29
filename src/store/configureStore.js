import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'

export const configureStore = (initialState, ...middleware) => createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)