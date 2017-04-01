import React, { Component, PropTypes } from 'react'
import syntax from '~/src/styles/syntaxHighlighting'
import tagTypes from './tagTypes'

const tokenizeAttrs = (attrs = []) => {
  return attrs.length < 1 ? [] : attrs.reduce((acc, attr) => {
    return [
      ...acc,
      { punctuation: 'SPACER', value: ' ' },
      { punctuation: 'ATTR_NAME', value: attr.name },
      { punctuation: 'ATTR_SETTER', value: '=' },
      { punctuation: 'ATTR_QUOTE_OPEN', value: '"' },
      { punctuation: 'ATTR_VALUE', value: attr.value },
      { punctuation: 'ATTR_QUOTE_CLOSE', value: '"' }
    ]
  }, [])
}

// why does this feel so weird
const XmlToken = ({node, list, type}) => {
  return (
    <span>
      {tagTypes[type].tokens({...node, attrs: tokenizeAttrs(node.attrs)}).map((token, i) => (
        <span key={i} style={syntax[token.punctuation](node)}>
          {token.value}
        </span>
      ))}
    </span>
  )
}

XmlToken.propTypes = {
  node: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

export default XmlToken
