import * as constants from './constants'
import { push } from 'react-router-redux'
import { constants as overlayConstants } from '~/src/containers/overlay'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import axios from 'axios'
import { findHtmlRoot } from '~/src/util'

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

export const htmlReceived = (rawHtml) => {
  const ast = parseHtml(rawHtml).childNodes[0]
  const list = treeToList()(ast)
  return {
    type: constants.HTML_FETCHED,
    ast,
    list,
    rawHtml,
    tree: list
  }
}

export const dismiss = () => ({ type: constants.DISMISS_SOURCESETTER })

export const dismissOverlay = () => ({ type: constants.DISMISS_OVERLAY })

export const fetchInit = () => ({ type: constants.FETCH_URL_INIT })

export const fetchErr = () => ({ type: constants.FETCH_URL_ERROR })

export const submit = ({rawHtml, url, name, lastModified}) => async (dispatch) => {
  dispatch(dismissOverlay())
  if (lastModified === 'html' || lastModified === 'file')
    dispatch(htmlReceived(rawHtml))
  else if (lastModified === 'url') {
    dispatch(fetchInit())
    try {
      const {data} = await axios.get(url)
      const { ast, list } = parseInit(rawHtml)
      dispatch(htmlReceived(rawHtml))
    }
    catch(e) {
      dispatch(fetchErr())
    }
  }
}