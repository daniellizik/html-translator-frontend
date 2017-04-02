import rawHtml from '~/test/htmlFixtures/cats.html'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import reducer from '~/src/store/rootReducer'
import * as constants from '~/src/components/clause/constants'
import state from '~/src/store/state'
import clauses, { basic, multi } from '~/test/stateFixtures/clauses'
import { reduceView } from '~/src/components/clause/subReducers'
import clauseReducer from '~/src/components/clause/reducer'

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

const nextState = {
  ...previousState,
  clauses: reduceView({clauseIndex: 0}, previousState.clauses, previousState.slave)
}

export default nextState