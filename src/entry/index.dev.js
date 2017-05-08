import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Root from '~/src/containers/root'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '~/src/store/rootReducer'
import { logger, rxcrx } from '~/src/store/middleware'
import '~/src/style/light.scss'
import state from '~/test/stateFixtures/onboarding'
// import state from '~/test/stateFixtures/dev'

const render = (App) => ReactDOM.render(
  <AppContainer>
    <div class="max">
      <Provider store={createStore(rootReducer, state, applyMiddleware(thunk, logger))}>
        <App />
      </Provider>
    </div>
  </AppContainer>,
  document.getElementById('root')
)

render(Root)

module.hot && module.hot.accept(`${__dirname}/../containers/root`, () => render(Root))