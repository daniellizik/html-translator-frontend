import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { bindConstantsToReducers } from '~/src/util'
import { colors } from '~/src/styles/constants'

const style = (n) => ({
  width: `${n}px`
})

export default ({percent = 0}) => (
  <div style={style(percent)}>

  </div>
)