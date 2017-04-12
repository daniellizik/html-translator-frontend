import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { generate as id } from 'shortid'
import XmlToken from './xmlToken'
import tagTypes from './tagTypes'
import { colors } from '~/src/styles/constants'

const styleRow = ({view}) => ({
  border: 'none',
  padding: '0px 15px 0px 0px'
})

const lineNumber = () => ({
  fontFamily: '"Source Code Pro", monospace',
  padding: '0px 10px 0px 15px',
  color: colors.inactive,
  userSelect: 'none',
  textAlign: 'right',
  cursor: 'pointer',
  width: '1em',
  ':hover': {
    color: colors.inactiveHover
  }
})

// this view prop comes from #util@mutateList
const lineText = ({view}) => ({
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: `"Source Code Pro", monospace`,
  whiteSpace: 'nowrap',
  background: !view ? 'transparent' : colors.dbg,
  cursor: 'text'
})

export const findTagType = ({node, list}) => {
  return Object
    .keys(tagTypes)
    .find(k => tagTypes[k].ignore({...node, list}))
}

const XmlTag = (props) => (
  <tr
    data-row={props.row}
    data-index={props.index}
    style={styleRow(props.node)}
    onClick={() => props.callbacks.click(props)}
    onMouseEnter={(e) => props.callbacks.highlight(props)}>
    <td style={lineNumber()}>
      {props.row}
    </td>
    <td style={lineText(props.node)}>
      {new Array(props.node.depth).fill('\u00a0\u00a0').join('')}
      <XmlToken key={id()} type={props.tagType} list={props.list} node={props.node} />
    </td>
  </tr>
)

XmlTag.propTypes = {
  node: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  openTags: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  callbacks: PropTypes.object.isRequired,
  tagType: PropTypes.string.isRequired
}

const withConnect = connect(s => s)(XmlTag)

export default withConnect
