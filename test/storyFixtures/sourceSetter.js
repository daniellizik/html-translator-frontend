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
  actions.fileReadDone('cats.html', 'cat'),
  actions.htmlReceived('<div>cat</div>')
)