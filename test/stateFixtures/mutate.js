import baseState from '~/test/stateFixtures/test'
import { basic } from '~/test/stateFixtures/clauses'
import reducer from '~/src/store/rootReducer'
import { reduceView } from '~/src/components/clause/subReducers'

export default {
  ...baseState,
  activeClause: 0,
  clauses: reduceView({clauseIndex: 0}, basic, baseState.slave)
}