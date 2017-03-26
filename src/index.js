import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { StyleRoot } from 'radium'
import Layout from './containers/layout'
import { configureStore } from './store/configureStore'
const { store } = configureStore()

render(
  <StyleRoot>
    <Provider store={store}>
      <Layout />
    </Provider>
  </StyleRoot>,
  document.getElementById('root')
)
