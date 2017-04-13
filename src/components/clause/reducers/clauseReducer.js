import * as constants from '../constants'
import { defaultClause } from '../settings/config'
import { bindConstantsToReducers } from '~/src/util'
import { errorHandler, reduceView, mapMutations, reduceClauses, reduceRuleProp, mutationDenormalizer } from './util'

export default bindConstantsToReducers({
  [constants.CLAUSE_ADD]: (state, action) => {
    const nextClauses = [ 
      ...state.clauses, 
      defaultClause
    ]
    const clauses = reduceView(nextClauses.length - 1, state.slave, nextClauses)
    return { ...state, clauses }
  },
  [constants.CLAUSE_DENORMALIZE_MUTATIONS]: (state, {clauseIndex}) => {
    let nextState
    try {
      nextState = {
        ...state,
        slave: {
          ...state.slave,
          currentMutation: clauseIndex,
          mutated: clauseIndex < 0 ? [] : mutationDenormalizer(
            state.clauses[clauseIndex],
            state.slave.list.list,
          )
        }
      }
    }
    catch(e) {
      process.env.NODE_ENV === 'development' && console.warn('error', e)
      return {
        ...state,
        error: errorHandler(e)
      }
    }
    return nextState
  },
  [constants.CLAUSE_ACTIVATE]: (state, {clauseIndex}) => ({ 
    ...state, activeClause: clauseIndex 
  }),
  [constants.CLAUSE_VIEW_MUTATIONS]: (state, {currentMutation}) => ({
    ...state,
    slave: { ...state.slave, currentMutation }
  }),
  [constants.CLAUSE_REMOVE]: (state, {clauseIndex}) => {
    const nextClauses = state.clauses.filter((c, i) => i !== clauseIndex)
    const { length } = state.clauses
    return {
      ...state,
      activeClause: (() => {
        if (nextClauses.length === 0)
          return -1
        else if (clauseIndex === 0)
          return 0
        else if (clauseIndex === length)
          return nextClauses.length - 1
        else
          return clauseIndex - 1
      })(),
      clauses: nextClauses
    }
  },
  [constants.CLAUSE_CHANGE_NAME]: (state, {clauseIndex, name}) => ({
    ...state,
    clauses: state.clauses.map((c, i) => i !== clauseIndex ? c : {
      ...c,
      name: name
    })
  }),
  [constants.CLAUSE_CHANGE_TARGET]: (state, {clauseIndex, target}) => {
    const clauses = state.clauses.map((c, i) => i !== clauseIndex ? c : {
      ...c, target
    })
    return {
      ...state,
      clauses: reduceView(clauseIndex, state.slave, clauses)
    }
  }
})
