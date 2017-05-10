import * as constants from '../constants'

export const remove = (clauseIndex, ruleIndex) => ({
  type: constants.QUERY_REMOVE,
  clauseIndex,
  ruleIndex,
  ruleType: 'QUERY'
})

export const add = (clauseIndex) => ({
  type: constants.QUERY_ADD,
  clauseIndex
})

// for async search
export const changeInit = () => ({ type: constants.QUERY_CHANGE_INIT })

export const changeError = (error) => ({
  type: constants.QUERY_CHANGE_ERROR,
  error
})

export const changeDone = (props) => ({
  ...props,
  type: constants.QUERY_CHANGE_DONE
})

export const changeTargetValue = (targetValue, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_TARGET_VALUE,
  targetValue,
  clauseIndex,
  ruleIndex
})

export const changeTargetValueAsync = (tv, ci, r) => (dispatch) => {
  
}

export const changeRule = (rule, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_RULE,
  rule,
  clauseIndex,
  ruleIndex
})

export const changeTarget = (target, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_TARGET,
  target,
  clauseIndex,
  ruleIndex
})

export const changeRuleValue = (ruleValue, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE,
  ruleValue,
  clauseIndex,
  ruleIndex
})

export const changeRuleValueFlags = (ruleValueFlags, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE_FLAGS,
  ruleValueFlags,
  clauseIndex,
  ruleIndex
})
