import rawHtml from '~/test/htmlFixtures/cats.html'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import reducer from '~/src/store/rootReducer'
import * as constants from '~/src/components/clause/constants'
import state from '~/src/store/state'
import { multi } from '~/test/stateFixtures/clauses'
import { reduceView } from '~/src/components/clause/reducers/util'

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
  clauses: reduceView({clauseIndex: 0}, previousState.clauses, previousState.slave)
}

nextState = {
  ...nextState,
  clauses: reduceView({clauseIndex: 1}, nextState.clauses, nextState.slave)
}

export default nextState