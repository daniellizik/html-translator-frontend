import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export const constants = {
  DISMISS_MODAL: '@OVERLAY/DISMISS_MODAL',
}

export const actions = {
  dismissModal: () => ({ type: constants.DISMISS_MODAL })
}

export function reducer(state, action) {
  if (action.type === constants.DISMISS_MODAL)
    return {
      ...state,
      overlay: false
    }
  return state
}

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

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(({dismissModal, visible}) => (
  <div onClick={() => dismissModal()} style={style(visible)}></div>
))