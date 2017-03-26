import React, { Component, PropTypes } from 'react'
import tokenApi, { tokenizeAttrs } from './tokenApi'
import styles from '~/src/styles'
import Radium from 'radium'

export function tokenize(acc, node, i, arr) {
  const reducedAttrs = tokenizeAttrs(node.attrs)
  const tokenized = tokenApi(acc, node, i, arr, reducedAttrs).find(signature => signature.canRender === true)
  return !tokenized ? null : tokenized.tokens
}

class XmlToken extends Component {
  static propTypes = {
    content: PropTypes.string,
    punctuation: PropTypes.string
  }
  render() {
    const { punctuation } = this.props
    return (
      <span style={styles.syntaxHighlighting[punctuation](this.props)}>
        {this.props.content}
      </span>
    )
  }
}

const withRadium = Radium(XmlToken)

export default withRadium
