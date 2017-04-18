import React from 'react'

export default ({depth}) => {
  return (
    <span>
      {new Array(depth).fill('\u00a0\u00a0').join('')}
    </span>
  )
}