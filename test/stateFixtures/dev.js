import rawHtml from '~/test/htmlFixtures/cats.html'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import reducer from '~/src/store/rootReducer'
import * as constants from '~/src/components/clause/constants'
import state from '~/src/store/state'
import clauses from '~/test/stateFixtures/queryclauses'

const ast = parseHtml(rawHtml)
const list = treeToList()(ast)
const action = {
  targetValue: 'cat-a',
  type: constants.CHANGE_TARGET_VALUE,
  stateKey: 'querybuilder',
  index: 0
}

export default reducer({
  ...state,
  querybuilder: {
    ...state.querybuilder,
    clauses: clauses[0]
  },
  slave: {
    ...state.slave,
    ast,
    list,
    rawHtml
  }
}, action)