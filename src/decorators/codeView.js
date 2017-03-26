import React, { Component, PropTypes } from 'react'

export default class CodeView extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
