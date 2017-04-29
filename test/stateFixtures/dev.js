import rawHtml from '~/test/htmlFixtures/cats.html'
import rootReducer from '~/src/store/rootReducer'
import state from '~/src/store/state'
import { multi as clauses } from '~/test/stateFixtures/clauses'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'
import { htmlReceived } from '~/src/containers/sourceSetter/actions'
import { chainActions } from '~/src/util'

export default chainActions(
  state,
  rootReducer,
  htmlReceived(rawHtml),
  (prevState) => ({...prevState, clauses}),
  queryActions.changeTargetValue('cat', 0, 0),
  queryActions.changeTargetValue('span', 1, 0),
  clauseActions.activate(0)
).pop()