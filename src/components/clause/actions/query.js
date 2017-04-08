import * as constants from '../constants'

export default {
  remove: (clauseIndex, ruleIndex) => ({
    type: constants.QUERY_REMOVE,
    clauseIndex,
    ruleIndex,
    ruleType: 'QUERY'
  }),
  add: (clauseIndex) => ({
    type: constants.QUERY_ADD,
    clauseIndex
  }),
  changeRule: (rule, clauseIndex, ruleIndex) => ({
    type: constants.QUERY_CHANGE_RULE,
    rule,
    clauseIndex,
    ruleIndex
  }),
  changeTarget: (target, clauseIndex, ruleIndex) => ({
    type: constants.QUERY_CHANGE_TARGET,
    target,
    clauseIndex,
    ruleIndex
  }),
  changeTargetValue: (targetValue, clauseIndex, ruleIndex) => ({
    type: constants.QUERY_CHANGE_TARGET_VALUE,
    targetValue,
    clauseIndex,
    ruleIndex
  }),
  changeRuleValue: (ruleValue, clauseIndex, ruleIndex) => ({
    type: constants.QUERY_CHANGE_RULE_VALUE,
    ruleValue,
    clauseIndex,
    ruleIndex
  }),
  changeRuleValueFlags: (ruleValueFlags, clauseIndex, ruleIndex) => ({
    type: constants.QUERY_CHANGE_RULE_VALUE_FLAGS,
    ruleValueFlags,
    clauseIndex,
    ruleIndex
  })
}