import React, { Component, PropTypes } from 'react'

const XmlToken = ({tokens}) => (
  <span>
    {tokens.map((token, i) => (
      <span key={i} class={`syntax_${token.type}`}>
        {token.value}
      </span>
    ))}
  </span>
)

XmlToken.propTypes = {
  tokens: PropTypes.array.isRequired
}

export default XmlToken
