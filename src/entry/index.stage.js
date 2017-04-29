import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Layout from '~/src/containers/layout'
import thunk from 'redux-thunk'
import { configureStore } from '~/src/store/configureStore'
import state from '~/src/store/state'

render(
  <div class="max">
    <Provider store={configureStore(state, thunk)}>
      <Layout />
    </Provider>
  </div>,
  document.getElementById('root')
)
