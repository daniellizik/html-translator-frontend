import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import XmlToken from './xmlToken'
import XmlSpacer from './xmlSpacer'

const XmlTag = (props) => (
  <tr
    data-row={props.row}
    class="pt-1"
    onClick={() => props.callbacks.click(props)}
    onMouseEnter={(e) => props.callbacks.highlight(props)}>
    <td 
      class="code-line f-monospace pr-2 c-inactive no-select ta-r mouse-point" 
      data-line-number={props.row}>
    </td>
    <td class={`f-monospace fs-p-14 no-wrap ${props.node.viewed ? 'bg-dbg' : ''}`}>
      <XmlSpacer depth={props.node.depth} />
      <XmlToken 
        tokens={props.tokens}
        key={props.index} 
        node={props.node} />
    </td>
  </tr>
)

XmlTag.propTypes = {
  node: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  tokens: PropTypes.array.isRequired,
  callbacks: PropTypes.object.isRequired,
}

const withConnect = connect(s => s)(XmlTag)

export default withConnect
