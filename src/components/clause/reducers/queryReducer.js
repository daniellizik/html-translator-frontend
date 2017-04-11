import * as constants from '../constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { defaultQuery, MUTATION } from '../settings/config'
import { reduceView, reduceMutated, reduceClauses, mapMutations } from './util'

export default function queryReducer(state, action) {
  let nextState = state

  if (action.type === constants.QUERY_ADD) {
    const nextClauses = state.clauses.map((clause, i) => {
      return i !== action.clauseIndex ? clause : {
        ...clause,
        queries: [
          ...clause.queries,
          defaultQuery
        ]
      }
    })
    const clauses = reduceView(action, nextClauses, state.slave)
    nextState = {
      ...state,
      clauses,
    }
  }

  else if (action.type === constants.QUERY_REMOVE) {
    const nextClauses = state.clauses.reduce((acc, clause, clauseIndex) => {
      if (clauseIndex !== action.clauseIndex)
        return [...acc, clause]
      else
        return [
          ...acc,
          {
            ...clause,
            queries: clause.queries.filter((query, ruleIndex) => ruleIndex !== action.ruleIndex)
          }
        ]
    }, [])
    const clauses = reduceView(action, nextClauses, state.slave)
    nextState = {
      ...state,
      clauses
    }
  }

  else if (action.type === constants.QUERY_CHANGE_RULE)
    nextState = reduceClauses(state, action, 'rule')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE)
    nextState = reduceClauses(state, action, 'ruleValue')

  else if (action.type === constants.QUERY_CHANGE_TARGET_VALUE)
    nextState = reduceClauses(state, action, 'targetValue')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE_FLAGS)
    nextState = reduceClauses(state, action, 'ruleValueFlags')

  return nextState

}