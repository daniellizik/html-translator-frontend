import React, { Component, PropTypes } from 'react'

export default class PolicyDecorator extends Component {
  static propTypes = {
    policy: PropTypes.object,
    clause: PropTypes.object
  }
  render() {
    const { policy, clause } = this.props
    const isValidTarget = [...policy.target].indexOf(clause.target) > -1
    const isValidRule = [...policy.rules].indexOf(clause.rule) > -1
    const isValidPolicy = isValidTarget && isValidRule
    return isValidPolicy ? this.props.children : null
  }
}
