import { saveAs as filesaver } from 'file-saver'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
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

export const constants = {
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
  if (action.type === constants.CALL_MUTATOR)
    return {
      ...state,
      components: {
        ...state.components,
        query: false,
        mutator: true
      }
    }
  if (action.type === constants.CALL_BUILDER)
    return { 
      ...state, 
      components: {
        ...state.components,
        query: true
      }
    }
  if (action.type === constants.CALL_MODAL)
    return {
      ...state,
      source: {
        ...state.source,
        visible: true
      }
    }
  return state
}

export const callBuilder = () => ({ type: constants.CALL_BUILDER })

export const callMutator = () => ({ type: constants.CALL_MUTATOR })

// apply mutations to view
// then apply view to ast
// then serialize ast to html string
export const downloadHtml = ({view, mutated, ast}) => (dispatch) => {
  dispatch({ type: constants.DOWNLOAD_HTML_DONE })
  // const blob = new Blob([html], {type: 'text/html;charset=utf-8'})
  // filesaver(blob)
}

export const previewHtml = () => ({ type: constants.CALL_IFRAME })

export const resetHtml = () => ({ type: constants.RESET_HTML })

const Navigator = ({mutated, dispatch}) => {
  return (
    <div class="row pl-3 pt-0 px-4 mb-0" style={bgStyle}>

      <div class="col-auto p-0 m-0">
        <span onClick={() => dispatch(callModal())} style={aStyle} class="mr-3">
          Change Html
        </span>
      </div>  

      <div class="col-auto p-0 m-0">
        <span onClick={() => dispatch(downloadHtml(mutated))} style={aStyle} class="mr-3">
          Download
        </span>
      </div>  

      <div class="col-auto p-0 m-0">
        <span onClick={() => dispatch(callBuilder())} style={aStyle} class="mr-3">
          Preview
        </span>
      </div>  

      <div class="col-auto p-0 m-0">
        <span onClick={() => dispatch(callBuilder())} style={aStyle} class="mr-3">
          Reset
        </span>
      </div>  

    </div>
  )
}

const mapStateToProps = (state) => ({
  mutated: state.slave.mutated
})

export default connect(mapStateToProps)(Navigator)
