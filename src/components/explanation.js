import React, { PropTypes } from 'react'

export default ({text = '', style = {}}) => (
  <div style={style}>
    {text}
  </div>
)

export const ChangeTargetExplanation = () => (
  <div>
    <p>
      The "target" indicates which part of a html tag you want to search for.
    </p>
    <ul>
      <li>"Node name" is the name of a html tag</li>
      <li>"Text" is the inner text of a html tag</li>
      <li>"Attribute key" is the name of any attribute on a html tag</li>
      <li>"Attribute value" is the value of a html tag</li>
    </ul>
  </div>
)