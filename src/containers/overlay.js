import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

export const constants = {
  DISMISS_MODAL: '@OVERLAY/DISMISS_MODAL',
  CALL_MODAL: '@OVERLAY/CALL_MODAL'
}
export const dismissModal = () => ({ type: constants.DISMISS_MODAL })
export const callModal = () => ({ type: constants.CALL_MODAL })

export function reducer(state, action) {
  if (action.type === constants.DISMISS_MODAL)
    return {
      ...state,
      source: {
        ...state.source,
        visible: false
      }
    }
  if (action.type === constants.CALL_MODAL)
    return {
      ...state,
      source: {
        ...state.source,
        visible: true
      }
    }
  return state
}

const style = ({visible}) => ({
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

class Overlay extends Component {
  render() {
    return (
      <div onClick={() => this.props.dismissModal()} style={style(this.props.source)}></div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dismissModal: () => dispatch(dismissModal())
})

export default connect(s => s, mapDispatchToProps)(Overlay)