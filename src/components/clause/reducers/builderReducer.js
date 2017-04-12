import * as constants from '../constants'
import { defaultClause } from '../settings/config'
import { reduceView, reduceClauses, mutationDenormalizer } from './util'

export default function(state, action) {

  let nextState = state

  if (action.type === constants.BUILDER_REMOVE_ALL_CLAUSES)
    nextState = {
      ...state,
      activeClause: -1,
      clauses: []
    }

  else if (action.type === constants.BUILDER_VIEW_ALL_MUTATIONS) {
    const mutated = state
      .clauses
      .reduce((list, clause) => mutationDenormalizer(clause, list), state.slave.list.list)
    nextState = {
      ...state,
      activeClause: -1,
      slave: {
        ...state.slave,
        mutated,
        view: mutated
      }
    }
  }

  return nextState

}