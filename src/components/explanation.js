import React, { PropTypes } from 'react'

export default ({text = '', style = {}}) => (
  <div style={style}>
    {text}
  </div>
)

export const AddClauseExplanation = () => (
  <div>
    <p>
      A "clause" is a group of queries and mutations. These are the blocks you use with which to find and replace certain parts of your html document. 
    </p>      
    <p class="mt-1">
      Try to add a clause by clicking on the button!
    </p>
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