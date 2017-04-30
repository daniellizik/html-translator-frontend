import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { bindConstantsToReducers } from '~/src/util'

export const constants = {
  DISMISS_OVERLAY: '@OVERLAY/DISMISS_OVERLAY',
}

export const actions = {
  dismiss: () => ({ type: constants.DISMISS_OVERLAY })
}

export const reducer = bindConstantsToReducers({
  [constants.DISMISS_OVERLAY]: (state, action) => ({
    ...state,
    overlay: state.onboarding.state ? true : false,
    // also dismiss modals
    source: {
      ...state.source,
      active: false
    }
  })
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(s => s, mapDispatchToProps)(({dismiss, overlay}) => (
  <div 
    class={`fixed cover opc-40 bg-darkestBlack z-15 ${overlay ? 'visible' : 'hidden'}`} 
    onClick={() => dismiss()}>
  </div>
))