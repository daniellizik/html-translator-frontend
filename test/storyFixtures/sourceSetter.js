import * as constants from '~/src/containers/sourceSetter/constants'
import * as actions from '~/src/containers/sourceSetter/actions'
import state from '~/test/stateFixtures/test'
import reducer from '~/src/store/rootReducer'
import { chainActions } from '~/src/util'

export default chainActions(
  state,
  reducer,
  actions.htmlRawChange('b'),
  actions.htmlRawChange('bl'),
  actions.htmlRawChange('bla'),
  actions.htmlRawChange('blah'),
  actions.urlChange('/cats.html'),
  actions.urlChange('/cats2.html'),
  actions.urlChange('/cats3.html'), 
  { type: constants.FILE_READ_DONE, name: 'cats.html', rawHtml: 'cat' },
  { type: constants.HTML_FETCHED, ast: {}, list: [1], name: 'blah', rawHtml: '<div>cat</div>' } 
)