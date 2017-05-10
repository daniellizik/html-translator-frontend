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
      attr: 'data-redirect',
      email: 'my email template',
      nodename: 'h2'
    }
  }
  queue(p, setState) {
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
                () => setTimeout(() => setState(prevState => ({
                  ...prevState,
                  [k]: str.slice(0, j + 1)
                })), acc2[k].time + ((j + 1) * p[k].typespeed || 50))
              ], [])]
            }, {...p, fns: []}).fns
      ], [])
      .forEach(f => f())
  }
  componentDidMount() {
    this.queue(config, this.setState.bind(this))
  }
  render() {
    return (
      <div class="row justify-content-center">
        <div class={`gradient col-4 mt-5 fixed z-15 scroll-no c-contrast br-4 ${this.props.onboarding.step === 0 ? 'visible' : 'hidden'}`}>
          <div class="row p-2 mt-2 h-100">
            <div class="col-12 m-0 py-0 px-2 h-80">
              <Html {...this.state} />
            </div>
            <div class="col-12 m-0 px-2 pt-4 h-20">
              <p>Take an interactive guide of the email translator! We'll go step by step through the app to learn how to translate any html email document.</p>
              <h2 class="c-hero cursor-pointer ta-c mt-3 strong" onClick={this.props.onboardInit}>Start Tutorial</h2>
              <p class="c-altMain cursor-pointer ta-c mt-3" onClick={this.props.skip}><em>nah, I'm good</em></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(s => s, (dispatch) => bindActionCreators(actions, dispatch))(Onboarder)