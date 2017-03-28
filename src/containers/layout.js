import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Radium, { StyleRoot } from 'radium'
import styles from '~/src/styles/'
import Navigator from '~/src/components/navigator'
import Builder from '~/src/components/builder'
import SourceSetter from '~/src/containers/sourceSetter/sourceSetter'
import HtmlMount from '~/src/containers/htmlMount'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { constants as navigatorConstants } from '~/src/components/navigator'

const setComponents = ({querybuilder, mutator, htmlmount, htmlpreview}) => {
  const base = { querybuilder: true, mutator: false }
  if (htmlmount === false && htmlpreview === false)
    return { ...base, htmlpreview, htmlmount: true }
  else
    return { ...base, htmlpreview, htmlmount }
}

export function reducer(state, action) {
  if (action.type === sourceSetterConstants.HTML_FETCHED)
    return { ...state, components: setComponents(state.components, action) }
  return state
}

class Layout extends Component {

  render() {
    const { deployer, sidebar } = styles.layout
    return (
      <div class="container-fluid p-0 m-0">
        <SourceSetter />
        <Navigator />
        <div class="row px-4">
          <div class="col-6">
            <Builder />
          </div>
          <div class="col-6">
            <HtmlMount />
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  isQB: !!state.components.querybuilder,
  isME: !!state.components.mutator
})

const mapDispatchToProps = (dispatch) => ({
  push: (route) => push(route)
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
