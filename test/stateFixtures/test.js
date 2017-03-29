import loader from '~/test/htmlFixtures/loader'
import { parse as parseHtml } from 'parse5'
import treeToList from '~/src/treeToList'
import reducer from '~/src/store/rootReducer'
import * as constants from '~/src/components/clause/constants'
import state from '~/src/store/state'
import queryclauses from '~/test/stateFixtures/queryclauses'

const rawHtml = loader(`${__dirname}/../htmlFixtures/cats.html`)
const ast = parseHtml(rawHtml)
const list = treeToList()(ast)


export default {
  ...state,
  clauses: [],
  slave: {
    ...state.slave,
    ast,
    list,
    rawHtml
  }
}