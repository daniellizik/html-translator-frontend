import rawHtml from '~/test/htmlFixtures/cats.html'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import reducer from '~/src/store/rootReducer'
import * as constants from '~/src/components/clause/constants'
import state from '~/src/store/state'
import clauses, { basic } from '~/test/stateFixtures/clauses'
import clauseReducer from '~/src/components/clause/reducer'

const ast = parseHtml(rawHtml)

const list = treeToList()(ast)

const action = {
  targetValue: 'cat',
  type: constants.QUERY_CHANGE_TARGET_VALUE,
  clauseIndex: 0,
  queryIndex: 0
}

const previousState = {
  ...state,
  clauses: basic,
  activeClause: 0,
  slave: {
    ...state.slave,
    ast,
    list,
    rawHtml
  }
}

export default clauseReducer(previousState, action)