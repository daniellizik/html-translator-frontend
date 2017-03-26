import * as constants from '~/src/containers/sourceSetter/constants'
import state from '~/test/stateFixtures/test'
import reducer from '~/src/containers/sourceSetter/reducer'
import { chainActions } from '~/src/util'

export default chainActions(
  state,
  reducer,
  { type: constants.HTML_RAW_CHANGE, rawHtml: 'b' },
  { type: constants.HTML_RAW_CHANGE, rawHtml: 'bl' },
  { type: constants.HTML_RAW_CHANGE, rawHtml: 'bla' },
  { type: constants.HTML_RAW_CHANGE, rawHtml: 'blah' },
  { type: constants.URL_CHANGE, url: '/cats.html' },
  { type: constants.URL_CHANGE, url: '/cats2.html' },
  { type: constants.URL_CHANGE, url: '/cats3.html' },
  { type: constants.FILE_READ_DONE, name: 'cats.html', rawHtml: 'cat' },
  { type: constants.HTML_FETCHED, ast: {}, list: [1], name: 'blah', rawHtml: '<div>cat</div>' } 
)