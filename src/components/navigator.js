import { saveAs as filesaver } from 'file-saver'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { bindConstantsToReducers } from '~/src/util'
import { ToolTip, ChangeHtmlExplanation } from '~/src/components/explanation'

export const CONSTANTS = {
  CALL_IFRAME: '@NAVIGATOR/CALL_IFRAME',
  CALL_SOURCESETTER: '@NAVIGATOR/CALL_SOURCESETTER',
  RESET_HTML: '@NAVIGATOR/RESET_HTML',
  DOWNLOAD_HTML_INIT: '@NAVIGATOR/DOWNLOAD_HTML_INIT',
  DOWNLOAD_HTML_ERROR: '@NAVIGATOR/DOWNLOAD_HTML_ERROR',
  DOWNLOAD_HTML_DONE: '@NAVIGATOR/DOWNLOAD_HTML_DONE'  
}

export const reducer = bindConstantsToReducers({
  [CONSTANTS.CALL_SOURCESETTER]: (state) => ({
    ...state,
    overlay: true,
    source: {
      ...state.source,
      active: true
    }
  })
})

export const actions = {
  callBuilder: () => ({ type: CONSTANTS.CALL_BUILDER }),
  callSourceSetter: () => ({ type: CONSTANTS.CALL_SOURCESETTER }),
  downloadHtml: ({xml, mutated}) => (dispatch) => {
    try {
      dispatch({ type: CONSTANTS.DOWNLOAD_HTML_INIT })
      process.env.NODE_ENV === 'production' && filesaver(new Blob([html], {type: 'text/html;charset=utf-8'}))
      return dispatch({ type: CONSTANTS.DOWNLOAD_HTML_DONE })
    }
    catch(e) {
      return dispatch({ type: CONSTANTS.DOWNLOAD_HTML_ERROR })
    }
  },
  previewHtml: () => ({ type: CONSTANTS.CALL_IFRAME }),
  resetHtml: () => ({ type: CONSTANTS.RESET_HTML })
}

const mapStateToProps = (state) => ({
  mutated: state.slave.mutated,
  xml: state.slave.xml,
  onboardingStep: state.onboarding.step
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(({onboardingStep, mutated, xml, callSourceSetter, downloadHtml, callBuilder}) => (
  <div class="row pl-3 pt-0 px-4 mb-0 bg-lightBlack lh-47 mouse-point b-b-darkestBlack">
    <div class="col-auto p-0 m-0">
      <ToolTip
        placement="topRight"
        destroyTooltipOnHide={true}
        visible={onboardingStep === 1}
        overlay={<ChangeHtmlExplanation />}>
        <span onClick={callSourceSetter} class="mr-3 c-white">
          Change Html
        </span>
      </ToolTip>
    </div>  
    <div class="col-auto p-0 m-0">
      <span onClick={() => downloadHtml({xml, mutated})} class="mr-3 c-white">
        Download
      </span>
    </div>  
    <div class="col-auto p-0 m-0">
      <span onClick={callBuilder} class="mr-3 c-white">
        Preview
      </span>
    </div>  
    <div class="col-auto p-0 m-0">
      <span onClick={callBuilder} class="mr-3 c-white">
        Reset
      </span>
    </div>  
  </div>
))
