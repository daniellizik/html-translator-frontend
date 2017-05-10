import React, { Component } from 'react'
import { connect } from 'react-redux'
import Overlay from '~/src/containers/overlay'
import Navigator from '~/src/components/navigator'
import Builder from '~/src/components/builder'
import SourceSetter from '~/src/containers/sourceSetter/sourceSetter'
import HtmlMount from '~/src/containers/htmlMount'
import Preview from '~/src/components/preview'
import Onboarder from '~/src/containers/onboarder/onboarder'
import Progress from '~/src/components/progress'
import Settings from '~/src/containers/settings'

export default class Root extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    // collect err, log it in prod
    window.onerror = () => {

    }
    if (process.env.NODE_ENV === 'production') {
      console.log('created by Daniel Lizik https://github.com/daniellizik')
    }
  }
  render() {
    return (
      <div class="container-fluid max p-0 m-0">
        <Progress />
        <Overlay />
        <Onboarder />
        <SourceSetter />
        <Preview />
        <Navigator />
        <Settings />
        <div class="h-95 row p-0 m-0">
          <div class="col-6 m-0 pr-2 x-scroll-no y-scroll bg-main">
            <Builder />
          </div>
          <div class="col-6 m-0 pl-2 y-scroll bg-html">
            <HtmlMount />
          </div>
        </div>
      </div>
    )
  }
}