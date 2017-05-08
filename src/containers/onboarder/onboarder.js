import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import Html from './html'
import config from './flickerConfig.json'

class Onboarder extends Component {
  constructor() {
    super()
    this.state = {
      hello: 'hello world',
      site: 'https://mysite.com',
      email: 'my email template'
    }
  }
  queue(p) {
    Object
      .keys(p)
      .reduce((acc, k) => [
        ...acc,
        ...p[k].queue.reduce((acc2, str, i) => typeof str === 'number' 
          ? {
              ...acc2,
              [k]: { ...acc2[k], time: (acc2[k].time || 0) + str }
            } 
          : {
              ...acc2,
              fns: [...acc2.fns, ...str.split('').reduce((acc3, char, j) => [
                ...acc3,
                () => setTimeout(() => this.setState(prevState => ({
                  ...prevState,
                  [k]: str.slice(0, j + 1)
                })), acc2[k].time + ((j + 1) * p[k].typespeed || 50))
              ], [])]
            }, {...p, fns: []}).fns
      ], [])
      .forEach(f => f())
  }
  componentDidMount() {
    this.queue(config)
  }
  render() {
    return (
      <div class="row justify-content-center">
        <div style={{height: '60%'}} class={`col-4 mt-5 fixed z-15 c-contrast bg-main br-4 ${this.props.onboarding.step === 0 ? 'visible' : 'hidden'}`}>
          <div class="row p-2 h-100">
            <div class="col-12 m-0 p-0 h-80">
              <Html {...this.state} />
            </div>
            <div class="col-12 m-0 px-2 pt-4 h-20">
              <span onClick={this.props.onboardInit}>start tutorial</span>
              <span onClick={this.props.skip}>skip</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(s => s, (dispatch) => bindActionCreators(actions, dispatch))(Onboarder)