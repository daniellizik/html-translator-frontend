import * as constants from './constants'
import { push } from 'react-router-redux'
import { constants as overlayConstants } from '~/src/containers/overlay'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import axios from 'axios'
import { findHtmlRoot } from '~/src/util'

export const dismiss = () => ({ type: constants.DISMISS_SOURCESETTER })

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

export const submit = ({rawHtml, url, name, lastModified}) => async (dispatch, getState) => {
  dispatch({ type: constants.DISMISS_OVERLAY })
  if (lastModified === 'html' || lastModified === 'file') {
    const ast = parseHtml(rawHtml).childNodes[0]
    const list = treeToList()(ast)
    const action = { 
      type: constants.HTML_FETCHED,
      tree: list,
      rawHtml,
      ast,
      list 
    }
    return await dispatch(action)
  }
  if (lastModified === 'url') {
    dispatch({ type: constants.FETCH_URL_INIT })
    try {
      const {data} = await axios.get(url)
      const ast = parseHtml(data).childNodes[0]
      const list = treeToList()(ast)
      return dispatch({
        type: constants.HTML_FETCHED,
        tree: list,
        rawHtml: data,
        ast,
        list  
      })  
    }
    catch(e) {
      return dispatch({ type: constants.FETCH_URL_ERROR })
    }
  }
}