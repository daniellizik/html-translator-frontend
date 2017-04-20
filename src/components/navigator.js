import { saveAs as filesaver } from 'file-saver'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '~/src/styles'
import { callModal } from '~/src/containers/overlay'
import deepInsert from '~/src/deepInsert'
import { colors } from '~/src/styles/constants'

const bgStyle = {
  backgroundColor: colors.lightBlack,
  lineHeight: '47px',
  height: '5%',
  cursor: 'pointer',
  borderBottom: `1px solid ${colors.darkestBlack}`
}

const aStyle = {
  color: '#FFFFFF',
  fontSize: '1em'
}

const rightStyle = {
  ...aStyle,
  textAlign: 'right'
}

const hStyle = {
  color: '#FFFFFF',
  fontSize: '1.5em'
}

export const CONSTANTS = {
  CALL_MODAL: '@NAVIGATOR/CALL_MODAL',
  CALL_BUILDER: '@NAVIGATOR/CALL_BUILDER',
  CALL_MUTATOR: '@NAVIGATOR/CALL_MUTATOR',
  CALL_IFRAME: '@NAVIGATOR/CALL_IFRAME',
  RESET_HTML: '@NAVIGATOR/RESET_HTML',
  // filesaver is synchronous, cant use these right now
  DOWNLOAD_HTML_INIT: '@NAVIGATOR/DOWNLOAD_HTML_INIT',
  DOWNLOAD_HTML_ERROR: '@NAVIGATOR/DOWNLOAD_HTML_ERROR',
  DOWNLOAD_HTML_DONE: '@NAVIGATOR/DOWNLOAD_HTML_DONE'  
}

export function reducer(state, action) {
  if (action.type === CONSTANTS.CALL_MUTATOR)
    return {
      ...state,
      components: {
        ...state.components,
        query: false,
        mutator: true
      }
    }
  if (action.type === CONSTANTS.CALL_BUILDER)
    return { 
      ...state, 
      components: {
        ...state.components,
        query: true
      }
    }
  if (action.type === CONSTANTS.CALL_MODAL)
    return {
      ...state,
      source: {
        ...state.source,
        visible: true
      }
    }
  return state
}

const actions = {
  callBuilder: () => ({ type: CONSTANTS.CALL_BUILDER }),
  callMutator: () => ({ type: CONSTANTS.CALL_MUTATOR }),
  downloadHtml: ({xml, mutated}) => (dispatch) => {
    dispatch({ type: CONSTANTS.DOWNLOAD_HTML_DONE })
    // const blob = new Blob([html], {type: 'text/html;charset=utf-8'})
    // filesaver(blob)
  },
  previewHtml: () => ({ type: CONSTANTS.CALL_IFRAME }),
  resetHtml: () => ({ type: CONSTANTS.RESET_HTML })
}

const mapStateToProps = (state) => ({
  mutated: state.slave.mutated,
  xml: state.slave.xml
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(({mutated, xml, callModal, downloadHtml, callBuilder}) => (
  <div class="row pl-3 pt-0 px-4 mb-0" style={bgStyle}>

    <div class="col-auto p-0 m-0">
      <span onClick={() => callModal()} style={aStyle} class="mr-3">
        Change Html
      </span>
    </div>  

    <div class="col-auto p-0 m-0">
      <span onClick={() => downloadHtml({xml, mutated})} style={aStyle} class="mr-3">
        Download
      </span>
    </div>  

    <div class="col-auto p-0 m-0">
      <span onClick={() => callBuilder()} style={aStyle} class="mr-3">
        Preview
      </span>
    </div>  

    <div class="col-auto p-0 m-0">
      <span onClick={() => callBuilder()} style={aStyle} class="mr-3">
        Reset
      </span>
    </div>  

  </div>
))
