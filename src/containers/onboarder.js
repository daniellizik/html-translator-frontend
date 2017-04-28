import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '~/src/styles/constants'
import { bindConstantsToReducers } from '~/src/util'
import ToolTip from 'rc-tooltip'
import { overlay as overlayStyle } from '~/src/styles/tooltip'

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
  ONBOARD_1: '@ONBOARDER/ONBOARD_1'
}

export const actions = {
  skip: () => ({ type: constants.SKIP_ONBOARDING }),
  onboard_1: () => ({ type: constants.ONBOARD_1 })
}

export const reducer = bindConstantsToReducers({
  [constants.SKIP_ONBOARDING]: (state) => ({
    ...state,
    overlay: false,
    onboarding: { ...state.onboarding, state: false }
  }),
  [constants.ONBOARD_1]: (state) => ({
    ...state,
    overlay: false,
    onboarding: { ...state.onboarding, state: false, step: 1 }
  })
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(s => s, mapDispatchToProps)(({onboarding, onboard_1, skip}) => (
  <div class="row justify-content-center">
    <div style={containerStyle(onboarding.state)} class="col-4 mt-5">
      <div class="row p-2 h-60">
        <div class="col-12 m-0 p-0 h-90">
          <h1 onClick={onboard_1}>start tutorial</h1>
          <h1 onClick={skip}>skip</h1>
        </div>
      </div>
    </div>
  </div>
))