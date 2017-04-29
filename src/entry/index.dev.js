import 'babel-polyfill'
import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { configureStore } from '~/src/store/configureStore'
import Layout from '~/src/containers/layout'
import state from '~/test/stateFixtures/dev'
// import state from '~/test/stateFixtures/onboarding'

const logger = ({getState}) => (next) => (action) => {
  console.log({...getState(), action})
  return next(action)
}

const mount = (Component) => render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('root')
)

mount(
  <div class="max">
    <Provider store={configureStore(state, thunk, logger)}>
      <Layout />
    </Provider>
  </div>
)

if (module.hot) {
  module.hot.accept('../containers/layout.js', () => {
    render(require('../containers/layout.js'))
  })
}