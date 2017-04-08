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
  activate: (active, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_ACTIVATE,
    active,
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
  changeRuleValueFlags: (ruleValue, clauseIndex, ruleIndex) => ({
    type: constants.MUTATION_CHANGE_RULE_VALUE_FLAGS,
    ruleValue,
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
