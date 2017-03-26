import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import styles from '~/src/styles'
import XmlToken, { tokenize } from './xmlToken'
import CodeView from '~/src/decorators/codeView'

class XmlTag extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    node: PropTypes.object,
    index: PropTypes.number,
    arr: PropTypes.array
  }
  static shouldIgnore(acc, node, index, arr) {
    return tokenize(acc, node, index, arr)
  }
  render() {
    const view = this.props.slave.view.map(v => v.id)
    const { node, index, arr, tokens, row, depth } = this.props
    return !tokens ? null : (
      <tr
        style={styles.code.row()}
        onClick={() => this.props.callbacks.click(this.props)}
        onMouseEnter={(e) => this.props.callbacks.highlight(this.props)}>
        <td style={styles.code.lineNumber()}>
          {row}
        </td>
        <td style={styles.code.lineText({...node, view, row })}>
          {new Array(node.depth).fill('\u00a0\u00a0').join('')}
          {tokens.map((token, i) => (
            <XmlToken key={i} {...token} />
          ))}
        </td>
      </tr>
    )
  }

}

const withRadium = Radium(XmlTag)
const withConnect = connect(s => s)(withRadium)

export default withConnect
