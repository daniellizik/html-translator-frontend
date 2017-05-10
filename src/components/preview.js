import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Preview extends Component {
  render() {
    return !this.props.iframe.state ? null : (
      <iframe src={`data:text/html;base64,${btoa(this.props.iframe.src)}`}>
      </iframe>
    )
  }
}

export default connect(s => s)(Preview)