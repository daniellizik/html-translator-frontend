import React, { Component, PropTypes } from 'react'

export default class PolicyDecorator extends Component {
  static propTypes = {
    policy: PropTypes.object,
    clause: PropTypes.object
  }
  render() {
    const { policy, clause } = this.props
    const isValidTarget = [...policy.target].includes(clause.target)
    const isValidRule = [...policy.rules].includes(clause.rule)
    const isValidPolicy = isValidTarget && isValidRule
    return isValidPolicy ? this.props.children : null
  }
}
