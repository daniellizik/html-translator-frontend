import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { configureStore } from '~/src/store/configureStore'
import Root from '~/src/containers/root'
// import state from '~/test/stateFixtures/dev'
import state from '~/test/stateFixtures/onboarding'
import '~/src/style/index.scss'

const logger = ({getState}) => (next) => (action) => {
  console.log(action)
  return next(action)
}

const render = (App) => ReactDOM.render(
  <AppContainer>
    <div class="max">
      <Provider store={configureStore(state, thunk, logger)}>
        <App />
      </Provider>
    </div>
  </AppContainer>,
  document.getElementById('root')
)

render(Root)

module.hot && module.hot.accept(`${__dirname}/../containers/root`, () => render(Root))