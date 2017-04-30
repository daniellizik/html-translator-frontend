import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'

export default connect(s => s, (dispatch) => bindActionCreators(actions, dispatch))(({onboarding, onboardInit, skip}) => (
  <div class="row justify-content-center">
    <div class={`col-4 mt-5 fixed z-15 bg-white br-4 ${onboarding.step === 0 ? 'visible' : 'hidden'}`}>
      <div class="row p-2 h-60">
        <div class="col-12 m-0 p-0 h-90">
          <h1 onClick={onboardInit}>start tutorial</h1>
          <h1 onClick={skip}>skip</h1>
        </div>
      </div>
    </div>
  </div>
))