import * as constants from './constants'
import * as config from '~/src/components/clause/settings/config'
import { bindConstantsToReducers } from '~/src/util'

export default bindConstantsToReducers({
  [constants.DISMISS_SOURCESETTER]: (state) => ({
    ...state,
    overlay: false,
    source: {
      ...state.source,
      active: false
    }
  }),
  [constants.FILE_READ_DONE]: (state, action) => ({
    ...state,
    source: {
      ...state.source,
      rawHtml: action.rawHtml,
      name: action.name,
      lastModified: 'file'
    }
  }),
  [constants.HTML_RAW_CHANGE]: (state, action) => ({
    ...state,
    source: {
      ...state.source,
      rawHtml: action.rawHtml,
      lastModified: 'html'
    }
  }),
  [constants.URL_CHANGE]: (state, action) => ({
    ...state,
    source: {
      ...state.source,
      url: action.url,
      lastModified: 'url'
    }
  }),
  [constants.HTML_FETCHED]: (state, action) => ({
    ...state,
    pastInit: true,
    source: {
      ...state.source,
      name: action.name
    },
    activeClause: 0,
    slave: {
      ...state.slave,
      status: 'DONE',
      ast: action.ast,
      list: action.list,
      rawHtml: action.rawHtml,
      view: [],
      mutated: [],
      xml: []
    },
    clauses: [config.defaultClause]
  }),
  [constants.FETCH_URL_ERROR]: (state, action) => ({
    ...state,
    error: action.error
  }),
})