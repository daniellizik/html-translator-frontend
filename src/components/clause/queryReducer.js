import * as constants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { query, mutator } from './config'
import { reduceView, reduceMutated, reduceClauses, mapMutations } from './subReducers'

export default function queryReducer(state, action) {
  let nextState = state

  if (action.type === constants.QUERY_ADD) {
    const clauses = state.clauses.map((clause, i) => {
      return i !== action.clauseIndex ? clause : {
        ...clause,
        rules: [
          ...clause.rules,
          query.defaultQuery
        ]
      }
    })
    nextState = {
      ...state,
      clauses,
      slave: {
        ...state.slave,
        view: reduceView(action, clauses, state.slave)
      }
    }
  }

  else if (action.type === constants.QUERY_REMOVE) {
    const clauses = state.clauses.reduce((acc, clause, clauseIndex) => {
      if (clauseIndex !== action.clauseIndex)
        return [...acc, clause]
      else
        return [
          ...acc,
          clause.rules.filter((query, queryIndex) => queryIndex !== action.queryIndex)
        ]
    }, [])
    nextState = {
      ...state,
      clauses,
      slave: {
        ...state.slave,
        view: reduceView(action, clauses, state.slave)
      }
    }
  }

  else if (action.type === constants.QUERY_CHANGE_RULE)
    nextState = reduceClauses(state, action, 'query', 'rule')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE)
    nextState = reduceClauses(state, action, 'query', 'ruleValue')

  // when user switches target or rule
  // need to clear the ruleValue, targetValue and input
  else if (action.type === constants.QUERY_CHANGE_TARGET)
    nextState = reduceClauses(state, action, 'query', 'target')

  else if (action.type === constants.QUERY_CHANGE_TARGET_VALUE)
    nextState = reduceClauses(state, action, 'query', 'targetValue')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE_FLAGS)
    nextState = reduceClauses(state, action, 'query', 'flags')

  return nextState

}