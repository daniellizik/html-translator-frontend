import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from '~/src/containers/root'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '~/src/store/rootReducer'
import { logger, rxcrx } from '~/src/store/middleware'
import state from '~/src/store/state'

render(
  <div class="max">
    <Provider store={createStore(rootReducer, state, applyMiddleware(thunk))}>
      <Root />
    </Provider>
  </div>,
  document.getElementById('root')
)

process.env.NODE_ENV === 'production' && console.log('created by Daniel Lizik https://github.com/daniellizik')

window.VERSION = process.env.VERSION