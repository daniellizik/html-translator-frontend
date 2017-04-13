import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styles from '~/src/styles/'
import Navigator from '~/src/components/navigator'
import Builder from '~/src/components/builder'
import SourceSetter from '~/src/containers/sourceSetter/sourceSetter'
import HtmlMount from '~/src/containers/htmlMount'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { constants as navigatorConstants } from '~/src/components/navigator'
import { colors } from '~/src/styles/constants'

export function reducer(state, action) {
  return state
}

const rowStyle = {
  width: '100%'
}

const builderStyle = {
  backgroundColor: colors.lightBlack,
  overflowY: 'scroll'
}

const htmlMountStyle = {
  backgroundColor: colors.darkBlack,
  overflowY: 'scroll'
}

class Layout extends Component {

  render() {
    const { deployer, sidebar } = styles.layout
    return (
      <div class="container-fluid tall p-0 m-0">
        <SourceSetter />
        <Navigator />
        <div style={rowStyle} class="row tall p-0 m-0">
          <div class="col-6 tall m-0 pr-2" style={builderStyle}>
            <Builder />
          </div>
          <div class="col-6 tall m-0 pl-2" style={htmlMountStyle}>
            <HtmlMount />
          </div>
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  push: (route) => push(route)
})

export default connect(s => s, mapDispatchToProps)(Layout)
