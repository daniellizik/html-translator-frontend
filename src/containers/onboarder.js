import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { bindConstantsToReducers } from '~/src/util'
import * as clauseConstants from '~/src/components/clause/constants'
import clauseReducer from '~/src/components/clause/reducers/clauseReducer'
import { CONSTANTS as navigatorConstants, reducer as navigatorReducer } from '~/src/components/navigator'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import sourceSetterReducer from '~/src/containers/sourceSetter/reducer'

const containerStyle = (visible) => ({
  position: 'fixed',
  zIndex: 12,
  visibility: visible ? 'visible' : 'hidden',
  height: '55%',
  backgroundColor: 'white',
  borderRadius: '4pt'
})

export const constants = {
  SKIP_ONBOARDING: '@ONBOARDER/SKIP_ONBOARDING',
  ONBOARD_INIT: '@ONBOARDER/ONBOARD_INIT'
}

export const actions = {
  skip: () => ({ type: constants.SKIP_ONBOARDING }),
  onboardInit: () => ({ type: constants.ONBOARD_INIT })
}

export const composedReducer = bindConstantsToReducers({
  [constants.SKIP_ONBOARDING]: (state) => ({
    ...state,
    overlay: false,
    onboarding: { ...state.onboarding, state: false }
  }),
  [constants.ONBOARD_INIT]: (state) => ({
    ...state,
    overlay: false,
    onboarding: { ...state.onboarding, state: false, step: 1 }
  }),
  [navigatorConstants.CALL_SOURCESETTER]: (state, action) => {
    const navState = navigatorReducer(state, action)
    const ns = {
      ...navState,
      source: {
        ...navState.source,
        lastModified: 'url',
        url: '/www/sample-email.html'
      },
      onboarding: { ...state.onboarding, step: 2 }
    }
    return ns
  },
  [sourceSetterConstants.HTML_FETCHED]: (state, action) => ({
    ...sourceSetterReducer(state, action),
    clauses: [],
    onboarding: { ...state.onboarding, step: 3 }
  }),
  [clauseConstants.CLAUSE_ADD]: (state, action) => ({
    ...state,
    onboarding: { ...state.onboarding, step: 4 }
  })
})

export default connect(s => s, (dispatch) => bindActionCreators(actions, dispatch))(({onboarding, onboardInit, skip}) => (
  <div class="row justify-content-center">
    <div style={containerStyle(onboarding.state)} class="col-4 mt-5">
      <div class="row p-2 h-60">
        <div class="col-12 m-0 p-0 h-90">
          <h1 onClick={onboardInit}>start tutorial</h1>
          <h1 onClick={skip}>skip</h1>
        </div>
      </div>
    </div>
  </div>
))