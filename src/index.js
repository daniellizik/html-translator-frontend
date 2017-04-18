import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Layout from './containers/layout'
import { configureStore } from './store/configureStore'
const { store } = configureStore()

render(
  <div class="max">
    <Provider store={store}>
      <Layout />
    </Provider>
  </div>,
  document.getElementById('root')
)
