import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from '~/src/containers/root'
import thunk from 'redux-thunk'
import { configureStore } from '~/src/store/configureStore'
import state from '~/src/store/state'
import '~/src/style/light.scss'

render(
  <div class="max">
    <Provider store={configureStore(state, thunk)}>
      <Root />
    </Provider>
  </div>,
  document.getElementById('root')
)
