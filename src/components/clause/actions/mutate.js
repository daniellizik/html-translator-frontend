import * as constants from '../constants'

export default {
  remove: (clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_REMOVE,
    clauseIndex,
    ruleIndex
  }),
  add: (clauseIndex) => ({
    type: constants.MUTATION_ADD,
    clauseIndex
  }),
  toggle: (active, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_TOGGLE,
    active,
    clauseIndex,
    ruleIndex
  }),
  changeBehavior: (behavior, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_CHANGE_BEHAVIOR, behavior, clauseIndex, ruleIndex
  }),
  changeTarget: (target, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_CHANGE_TARGET,
    target,
    clauseIndex,
    ruleIndex
  }),
  changeTargetValue: (targetValue, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_CHANGE_TARGET_VALUE,
    targetValue,
    clauseIndex,
    ruleIndex
  }),
  changeRule: (rule, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_CHANGE_RULE,
    rule,
    clauseIndex,
    ruleIndex
  }),
  changeRuleValue: (ruleValue, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_CHANGE_RULE_VALUE,
    ruleValue,
    clauseIndex,
    ruleIndex
  }),
  changeRuleValueFlags: (ruleValueFlags, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_CHANGE_RULE_VALUE_FLAGS,
    ruleValueFlags,
    clauseIndex,
    ruleIndex
  }),
  addAttr: (attrKey, attrVal, index) => ({
    type: constants.MUTATION_ADD_ATTR,
    attrKey,
    attrVal,
    index
  }),
  removeAttrByKey: (attrKey, index) => ({
    type: constants.MUTATION_REMOVE_ATTR_BY_KEY,
    attrKey,
    index
  }),
  removeAttrByValue: (attrVal, index) => ({
    type: constants.MUTATION_REMOVE_ATTR_BY_VALUE,
    attrVal,
    index
  }),
  removeAllAttrs: (index) => ({
    type: constants.MUTATION_REMOVE_ALL_ATTRS,
    index
  })
}
