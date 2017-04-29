import rawHtml from '~/test/htmlFixtures/cats.html'
import reducer from '~/src/store/rootReducer'
import state from '~/src/store/state'
import sourceSetter from '~/src/containers/sourceSetter/reducer'
import { submit } from '~/src/containers/sourceSetter/actions'
import { chainActions } from '~/src/util'
import { htmlReceived } from '~/src/containers/sourceSetter/actions'

export default chainActions(
  state,
  reducer,
  htmlReceived(rawHtml),
  (nextState) => ({...nextState, clauses: []})
).pop()