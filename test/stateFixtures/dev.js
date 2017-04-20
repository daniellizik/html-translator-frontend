import rawHtml from '~/test/htmlFixtures/cats.html'
import state from '~/src/store/state'
import { multi } from '~/test/stateFixtures/clauses'
import { reduceView } from '~/src/components/clause/reducers/util'
import clauseActions from '~/src/components/clause/actions/clause'
import viewReducer from '~/src/components/clause/reducers/viewReducer'
import xmlReducer from '~/src/components/xml/xmlReducer'
import sourceSetter from '~/src/containers/sourceSetter/reducer'
import { sourceSubmit } from '~/src/containers/sourceSetter/actions'

let nextState = {
  ...sourceSetter(
    state,
    sourceSubmit({rawHtml, lastModified: 'html'})
  ),
  activeClause: 0,
  clauses: multi
}

nextState = {
  ...nextState,
  clauses: reduceView(0, nextState.slave, nextState.clauses)
}

nextState = {
  ...nextState,
  clauses: reduceView(1, nextState.slave, nextState.clauses)
}

nextState = viewReducer(nextState, clauseActions.activate(0))

nextState = xmlReducer(nextState, {type: '@CLAUSE'})

export default nextState