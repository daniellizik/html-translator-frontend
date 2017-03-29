import * as constants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { query, mutator } from './config'
import { reduceView, reduceMutated, reduceClauses, mapMutations } from './subReducers'

export default function queryReducer(state, action) {
  let nextState = state

  if (action.type === constants.QUERY_ADD)
    nextState = {
      ...state,
      clauses: state.clauses.map((clause, i) => {
        if (i !== action.clauseIndex)
          return clause
        return [...clause, query.defaultQuery]
      })
    }

  else if (action.type === constants.QUERY_REMOVE)
    nextState = {
      ...state,
      clauses: state.clauses.reduce((acc, clause, clauseIndex) => {
        if (clauseIndex !== action.clauseIndex)
          return [...acc, clause]
        else
          return [
            ...acc,
            clause.filter((query, queryIndex) => queryIndex !== action.queryIndex)
          ]
      }, [])
    }

  else if (action.type === constants.QUERY_CHANGE_RULE)
    nextState = reduceClauses(state, action, 'rule')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE)
    nextState = reduceClauses(state, action, 'ruleValue')

  // when user switches target or rule
  // need to clear the ruleValue, targetValue and input
  else if (action.type === constants.QUERY_CHANGE_TARGET)
    nextState = reduceClauses(state, action, 'target')

  else if (action.type === constants.QUERY_CHANGE_TARGET_VALUE)
    nextState = reduceClauses(state, action, 'targetValue')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE_FLAGS)
    nextState = reduceClauses(state, action, 'flags')

  return nextState

}