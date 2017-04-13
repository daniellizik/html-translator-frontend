import * as constants from '../constants'
import { defaultClause } from '../settings/config'
import { bindConstantsToReducers } from '~/src/util'
import { reduceView, reduceClauses, mutationDenormalizer } from './util'

export default bindConstantsToReducers({
  [constants.BUILDER_REMOVE_ALL_CLAUSES]: (state, action) => ({
    ...state,
    activeClause: -1,
    clauses: []
  }),
  [constants.BUILDER_HIDE_ALL_MUTATIONS]: (state, action) => ({
    ...state,
    activeClause: 0,
    slave: {
      ...state.slave,
      mutated: state.slave.list.list,
      view: []
    }
  }),
  [constants.BUILDER_VIEW_ALL_MUTATIONS]: (state, action) => {
    const mutated = state
      .clauses
      .reduce((list, clause) => mutationDenormalizer(clause, list), state.slave.list.list)
    return {
      ...state,
      activeClause: -1,
      slave: {
        ...state.slave,
        mutated,
        view: mutated
      }
    }
  }
})