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

const style = (visible) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: .4,
  zIndex: 2,
  visibility: visible === false ? 'hidden' : 'visible'
})

const mapStateToProps = (state) => ({ visible: state.overlay })
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(({dismiss, visible}) => (
  <div onClick={() => dismiss()} style={style(visible)}></div>
))