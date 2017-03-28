import * as constants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { query, mutator } from './config'
import { reduceView, reduceMutated, reduceClause, mapMutations } from './subReducers'

export default function queryReducer(state, action) {
  let result = state

  if (action.type === constants.QUERY_CHANGE_RULE)
    result = reduceClauses(state, action, 'rule')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE)
    result = reduceClauses(state, action, 'ruleValue')
    
  // when user switches target or rule
  // need to clear the ruleValue, targetValue and input
  else if (action.type === constants.QUERY_CHANGE_TARGET)
    result = reduceClauses(state, action, 'target')

  else if (action.type === constants.QUERY_CHANGE_TARGET_VALUE)
    result = reduceClauses(state, action, 'targetValue')

  else if (action.type === constants.QUERY_CHANGE_RULE_VALUE_FLAGS)
    result = reduceClauses(state, action, 'flags')

  return result

}