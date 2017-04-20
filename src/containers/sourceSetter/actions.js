import * as constants from './constants'
import { push } from 'react-router-redux'
import { constants as overlayConstants } from '~/src/containers/overlay'
import sanitizer from 'sanitizer'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import fetch from 'isomorphic-fetch'

export const htmlRawChange = (rawHtml) => ({
  type: constants.HTML_RAW_CHANGE,
  rawHtml
})

export const urlChange = (url) => ({
  type: constants.URL_CHANGE,
  url
})

export const fileSelect = (file) => (dispatch) => {
  const reader = new FileReader()
  const {name} = file
  dispatch({ type: constants.FILE_READ_INIT })
  reader.onload = ({target}) => {
    dispatch({ type: constants.FILE_READ_DONE, name, rawHtml: target.result })
  }
  reader.onerror = (e) => {
    dispatch({ type: constants.FILE_READ_ERROR, error: e })
  }
  reader.readAsText(file)
}

export const sourceSubmit = ({rawHtml, url, name, lastModified}) => (dispatch) => {
  dispatch({ type: overlayConstants.DISMISS_MODAL })
  if (lastModified === 'html' || lastModified === 'file') {
    const ast = parseHtml(rawHtml)
    const list = treeToList()(ast)
    return dispatch({ 
      type: constants.HTML_FETCHED,
      tree: list,
      rawHtml,
      ast,
      list 
    })
  }
  if (lastModified === 'url') {
    dispatch({ type: constants.FETCH_URL_INIT })
    return fetch(url)
      .then(t => t.text())
      .then(rawHtml => {
        const ast = parseHtml(rawHtml)
        const list = treeToList()(ast)
        return dispatch({
          type: constants.HTML_FETCHED,
          tree: list,
          rawHtml,
          ast,
          list
        })
      })
      .catch(e => dispatch({ type: constants.FETCH_URL_ERROR }))
  }
}