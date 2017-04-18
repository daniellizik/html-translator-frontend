import React, { Component, PropTypes } from 'react'
import * as syntax from './syntaxHighlighting'

const XmlToken = ({tokens}) => {
  return (
    <span>
      {tokens.map((token, i) => (
        <span key={i} style={syntax[token.punctuation]}>
          {token.value}
        </span>
      ))}
    </span>
  )
}

XmlToken.propTypes = {
  tokens: PropTypes.array.isRequired
}

export default XmlToken
