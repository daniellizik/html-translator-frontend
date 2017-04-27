import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Overlay from '~/src/containers/overlay'
import { colors } from '~/src/styles/constants'
import { bindConstantsToReducers } from '~/src/util'
import ToolTip from 'rc-tooltip'
import { overlay as overlayStyle } from '~/src/styles/tooltip'

const containerStyle = (visible) => ({
  position: 'fixed',
  zIndex: 12,
  visibility: visible ? 'visible' : 'hidden',
  height: '90%',
  backgroundColor: 'white'
})

export const constants = {
  SKIP_ONBOARDING: '@ONBOARDER/SKIP_ONBOARDING'
}

export const actions = {
  skip: () => ({ type: constants.SKIP_ONBOARDING })
}

export const reducer = bindConstantsToReducers({
  [constants.SKIP_ONBOARDING]: (state, action) => ({
    ...state,
    overlay: false,
    user: { ...state.user, onboarding: false }
  })
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(s => s, mapDispatchToProps)(({overlay, user, skip}) => (
  <div class="row justify-content-center">
    <Overlay overlay={overlay ? true : false}/>
    <div style={containerStyle(user.onboarding)} class="col-6 mt-5">
      <ToolTip
        placement="right"
        destroyTooltipOnHide={true}
        overlayStyle={overlayStyle}
        overlay={<span>tt text!!</span>}>
        <span>onboard</span>
      </ToolTip>
      <span onClick={skip}>skip</span>
    </div>
  </div>
))