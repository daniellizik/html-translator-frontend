import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { generate as id } from 'shortid'
import styles from '~/src/styles'
import XmlToken from './xmlToken'
import tagTypes from './tagTypes'

const styleRow = {
  border: 'none',
  background: 'transparent',
  fontSize: '12px',
  margin: 0,
  padding: '0px 15px 0px 0px',
}

export const findTagType = ({node, list}) => {
  return Object
    .keys(tagTypes)
    .find(k => tagTypes[k].ignore({...node, list}))
}

const XmlTag = (props) => (
  <tr
    style={styleRow}
    onClick={() => props.callbacks.click(props)}
    onMouseEnter={(e) => props.callbacks.highlight(props)}>
    <td style={styles.code.lineNumber()}>
      {props.row}
    </td>
    <td style={styles.code.lineText(props)}>
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
