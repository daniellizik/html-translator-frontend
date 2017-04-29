import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import XmlToken from './xmlToken'
import XmlSpacer from './xmlSpacer'
import { colors } from '~/src/styles/constants'

const styleRow = ({viewed}) => ({
  border: 'none',
  padding: '0px 15px 0px 0px'
})

const lineNumber = () => ({
  fontFamily: '"Source Code Pro", monospace',
  padding: '0px 10px 0px 40px',
  color: colors.inactive,
  userSelect: 'none',
  textAlign: 'right',
  cursor: 'pointer',
  width: '1em'
})

// this viewed prop comes from #util@mutateList
const lineText = ({viewed}) => ({
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: `"Source Code Pro", monospace`,
  whiteSpace: 'nowrap',
  background: !viewed ? 'transparent' : colors.dbg,
  cursor: 'text'
})

const XmlTag = (props) => (
  <tr
    data-row={props.row}
    style={styleRow(props.node)}
    onClick={() => props.callbacks.click(props)}
    onMouseEnter={(e) => props.callbacks.highlight(props)}>
    <td 
      class="code-line" 
      data-line-number={props.row} 
      style={lineNumber()}>
    </td>
    <td style={lineText(props.node)}>
      <XmlSpacer depth={props.node.depth} />
      <XmlToken 
        tokens={props.tokens}
        key={new Date().getTime()} 
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
