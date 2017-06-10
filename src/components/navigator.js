import { saveAs as filesaver } from 'file-saver'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { bindConstantsToReducers, stringifyMutated } from '~/src/util'
import { ToolTip, ChangeHtmlExplanation } from '~/src/components/explanation'

export const constants = {
  CALL_IFRAME: '@NAVIGATOR/CALL_IFRAME',
  DISMISS_IFRAME: '@NAVIGATOR/DISMISS_IFRAME',
  CALL_SOURCESETTER: '@NAVIGATOR/CALL_SOURCESETTER',
  DOWNLOAD_HTML_INIT: '@NAVIGATOR/DOWNLOAD_HTML_INIT',
  DOWNLOAD_HTML_ERROR: '@NAVIGATOR/DOWNLOAD_HTML_ERROR',
  DOWNLOAD_HTML_DONE: '@NAVIGATOR/DOWNLOAD_HTML_DONE'  
}

export const reducer = bindConstantsToReducers({
  [constants.CALL_SOURCESETTER]: (state) => state.onboarding.step > 1 ? state : ({
    ...state,
    overlay: true,
    source: {
      ...state.source,
      active: true
    }
  }),
  [constants.CALL_IFRAME]: (state, {html}) => ({
    ...state,
    overlay: true,
    iframe: {
      state: true,
      src: html
    }
  })
})

export const actions = {
  callBuilder: () => ({ type: constants.CALL_BUILDER }),
  callIframe: (xml) => ({ 
    type: constants.CALL_IFRAME,
    html: stringifyMutated(xml)
  }),
  callSourceSetter: () => ({ type: constants.CALL_SOURCESETTER }),
  downloadHtml: ({xml}) => (dispatch) => {
    try {
      const html = stringifyMutated(xml)
      dispatch({ type: constants.DOWNLOAD_HTML_INIT })
      if (/development|test/.test(process.env.NODE_ENV))
        console.log(html)
      if (/production|staging/.test(process.env.NODE_ENV))
        filesaver(new Blob([html], {type: 'text/html;charset=utf-8'}))
      return dispatch({ type: constants.DOWNLOAD_HTML_DONE })
    }
    catch(e) {
      return dispatch({ type: constants.DOWNLOAD_HTML_ERROR })
    }
  },
  previewHtml: () => ({ type: constants.CALL_IFRAME })
}

const mapStateToProps = (state) => ({
  xml: state.slave.xml,
  user: state.user,
  onboardingStep: state.onboarding.step
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(({user, onboardingStep, xml, callSourceSetter, callIframe, downloadHtml}) => (
  <div class="row m-0 p-0 c-hero bg-main fs-12 lh-47 mouse-point b-b-strong">
    <div class="col-12 px-4 m-0 ta-r">

      {!user.auth && <div class="inline">
        <span class="ml-4 td-ul--hover">
          <i class="fa fa-chevron-circle-up mr-2"></i>
          <a href="signup.html">Signup</a>
        </span>
      </div>}

      {!user.auth && <div class="inline">
        <span class="ml-4 td-ul--hover">
          <i class="fa fa-sign-in mr-2"></i>
          <a href="login.html">Login</a>
        </span>
      </div>}

      <div class="inline">
        <ToolTip
          placement="topRight"
          destroyTooltipOnHide={true}
          visible={onboardingStep === 1}
          overlay={<ChangeHtmlExplanation />}>
          <span onClick={callSourceSetter} class="td-ul--hover ml-4">
            <i class="fa fa-html5 mr-2"></i>
            Change Html
          </span>
        </ToolTip>
      </div>  

      <div class="inline">
        <span onClick={() => downloadHtml({xml})} class="td-ul--hover ml-4">
          <i class="fa fa-download mr-2"></i>
          Download
        </span>
      </div>

      {user.auth && <div class="inline">
        <span onClick={() => openSettings()} class="td-ul--hover ml-4">
          <i class="fa fa-gear mr-2"></i>
          Account/Settings
        </span>
      </div>}

    </div>
  </div>
))
