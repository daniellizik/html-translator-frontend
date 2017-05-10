import * as constants from './constants'
import { parseHtml, presortList } from '~/src/util'
import { constants as overlayConstants } from '~/src/containers/overlay'
import axios from 'axios'

export const htmlRawChange = (rawHtml) => ({
  type: constants.HTML_RAW_CHANGE,
  rawHtml
})

export const urlChange = (url) => ({
  type: constants.URL_CHANGE,
  url
})

export const fileReadInit = () => ({ type: constants.FILE_READ_INIT })

export const fileReadDone = (name, rawHtml) => ({ type: constants.FILE_READ_DONE, name, rawHtml })

export const fileReadError = (error) => ({ type: constants.FILE_READ_ERROR, error })

export const fileSelect = (file) => (dispatch) => {
  const reader = new FileReader()
  const {name} = file
  dispatch(fileReadInit())
  reader.onload = ({target}) => {
    dispatch(fileReadDone(name, target.result))
  }
  reader.onerror = ({message}) => {
    dispatch(fileReadError(message))
  }
  reader.readAsText(file)
}

export const htmlReceived = (rawHtml) => {
  const {ast, list} = parseHtml(rawHtml)
  // notes 1
  const presort = presortList(list.list)
  return {
    type: constants.HTML_FETCHED,
    ast,
    list,
    presort,
    rawHtml,
    tree: list
  }
}

export const dismiss = () => ({ type: constants.DISMISS_SOURCESETTER })

export const dismissOverlay = () => ({ type: constants.DISMISS_OVERLAY })

export const fetchInit = () => ({ type: constants.FETCH_URL_INIT })

export const fetchErr = (error) => ({ error, type: constants.FETCH_URL_ERROR })

export const submit = ({rawHtml, url, name, lastModified}) => async (dispatch) => {
  dispatch(dismissOverlay())
  if (lastModified === 'html' || lastModified === 'file')
    dispatch(htmlReceived(rawHtml))
  else if (lastModified === 'url') {
    dispatch(fetchInit())
    try {
      const {data} = await axios.get(url)
      dispatch(htmlReceived(data))
    }
    catch({message}) {
      dispatch(fetchErr(message))
    }
  }
}