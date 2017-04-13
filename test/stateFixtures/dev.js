import rawHtml from '~/test/htmlFixtures/cats.html'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import reducer from '~/src/store/rootReducer'
import * as constants from '~/src/components/clause/constants'
import state from '~/src/store/state'
import { multi } from '~/test/stateFixtures/clauses'
import { reduceView } from '~/src/components/clause/reducers/util'
import clauseActions from '~/src/components/clause/actions/clause'
import viewReducer from '~/src/components/clause/reducers/viewReducer'

const ast = parseHtml(rawHtml)

const list = treeToList()(ast)

const previousState = {
  ...state,
  clauses: multi,
  activeClause: 0,
  slave: {
    ...state.slave,
    ast,
    list,
    rawHtml
  }
}

let nextState = {
  ...previousState,
  clauses: reduceView(0, previousState.slave, previousState.clauses)
}

nextState = {
  ...nextState,
  clauses: reduceView(1, nextState.slave, nextState.clauses)
}

const t = viewReducer(nextState, clauseActions.activate(0))

export default t