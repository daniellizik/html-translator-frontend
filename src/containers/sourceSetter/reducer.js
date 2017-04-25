import * as constants from './constants'
import * as config from '~/src/components/clause/settings/config'

export default function(state, action) {

  if (action.type === constants.CALL_MODAL)
    return {
      ...state,
      overlay: true
    }

  if (action.type === constants.FILE_READ_DONE)
    return {
      ...state,
      source: {
        ...state.source,
        rawHtml: action.rawHtml,
        name: action.name,
        lastModified: 'file'
      }
    }

  if (action.type === constants.HTML_RAW_CHANGE)
    return {
      ...state,
      source: {
        ...state.source,
        rawHtml: action.rawHtml,
        lastModified: 'html'
      }
    }

  if (action.type === constants.URL_CHANGE)
    return {
      ...state,
      source: {
        ...state.source,
        url: action.url,
        lastModified: 'url'
      }
    }
  // this is the "done" thing
  if (action.type === constants.HTML_FETCHED)
    return {
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
    } 

  if (action.type === constants.FETCH_URL_ERROR)
    return {
      ...state,
      error: action.error
    }

  return state

}