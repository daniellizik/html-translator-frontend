import { saveAs as filesaver } from 'file-saver'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { bindConstantsToReducers } from '~/src/util'
import { ToolTip, ChangeHtmlExplanation } from '~/src/components/explanation'

export const constants = {
  CALL_IFRAME: '@NAVIGATOR/CALL_IFRAME',
  CALL_SOURCESETTER: '@NAVIGATOR/CALL_SOURCESETTER',
  RESET_HTML: '@NAVIGATOR/RESET_HTML',
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
  })
})

export const actions = {
  callBuilder: () => ({ type: constants.CALL_BUILDER }),
  callSourceSetter: () => ({ type: constants.CALL_SOURCESETTER }),
  downloadHtml: ({xml, mutated}) => (dispatch) => {
    try {
      dispatch({ type: constants.DOWNLOAD_HTML_INIT })
      process.env.NODE_ENV === 'production' && filesaver(new Blob([html], {type: 'text/html;charset=utf-8'}))
      return dispatch({ type: constants.DOWNLOAD_HTML_DONE })
    }
    catch(e) {
      return dispatch({ type: constants.DOWNLOAD_HTML_ERROR })
    }
  },
  previewHtml: () => ({ type: constants.CALL_IFRAME }),
  resetHtml: () => ({ type: constants.RESET_HTML })
}

const mapStateToProps = (state) => ({
  mutated: state.slave.mutated,
  xml: state.slave.xml,
  onboardingStep: state.onboarding.step
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(({onboardingStep, mutated, xml, callSourceSetter, downloadHtml, callBuilder}) => (
  <div class="row m-0 p-0 c-hero strong bg-main fs-12 lh-47 mouse-point b-b-strong">
    <div class="col-12 px-4 m-0">
      <div class="inline">
        <ToolTip
          placement="topRight"
          destroyTooltipOnHide={true}
          visible={onboardingStep === 1}
          overlay={<ChangeHtmlExplanation />}>
          <span onClick={callSourceSetter} class="mr-4">
            <i class="fa fa-html5 mr-1"></i>
            Change Html
          </span>
        </ToolTip>
      </div>  
      <div class="inline">
        <span onClick={() => downloadHtml({xml, mutated})} class="mr-4">
          <i class="fa fa-download mr-1"></i>
          Download
        </span>
      </div>  
      <div class="inline">
        <span onClick={callBuilder} class="mr-4">
          <i class="fa fa-picture-o mr-1"></i>
          Preview
        </span>
      </div>  
    </div>
  </div>
))
