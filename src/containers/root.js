import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Overlay from '~/src/containers/overlay'
import Navigator from '~/src/components/navigator'
import Builder from '~/src/components/builder'
import SourceSetter from '~/src/containers/sourceSetter/sourceSetter'
import HtmlMount from '~/src/containers/htmlMount'
import Onboarder from '~/src/containers/onboarder/onboarder'
import Progress from '~/src/components/progress'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { constants as navigatorConstants } from '~/src/components/navigator'

export default () => (
  <div class="container-fluid max p-0 m-0">
    <Progress />
    <Overlay />
    <Onboarder />
    <SourceSetter />
    <Navigator />
    <div style={{height: '95%'}} class="row p-0 m-0">
      <div class="col-6 m-0 pr-2 x-scroll-no y-scroll bg-main">
        <Builder />
      </div>
      <div class="col-6 m-0 pl-2 y-scroll bg-html">
        <HtmlMount />
      </div>
    </div>
  </div>
)