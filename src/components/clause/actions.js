import * as constants from './constants'
import { push } from 'react-router-redux'

export const startEditor = (hash) => push(hash) 

export const activateClause = (clauseIndex) => ({
  type: constants.CLAUSE_ACTIVATE,
  clauseIndex
})

export const removeAllClauses = () => ({
  type: constants.CLAUSE_REMOVE_ALL
})

export const addClause = () => ({
  type: constants.CLAUSE_ADD
})

export const changeClauseName = (clauseIndex, name) => ({
  type: constants.CLAUSE_CHANGE_NAME,
  clauseIndex,
  name
})

export const removeClause = (clauseIndex) => ({
  type: constants.CLAUSE_REMOVE,
  clauseIndex
})

export const removeQuery = (clauseIndex, queryIndex) => ({
  type: constants.QUERY_REMOVE,
  clauseIndex,
  queryIndex
})

export const addQuery = (clauseIndex) => ({
  type: constants.QUERY_ADD,
  clauseIndex
})

export const changeTarget = (target, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_TARGET,
  target,
  clauseIndex,
  queryIndex
})

export const changeTargetValue = (targetValue, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_TARGET_VALUE,
  targetValue,
  clauseIndex,
  queryIndex
})

export const changeRule = (rule, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_RULE,
  rule,
  clauseIndex,
  queryIndex
})

export const changeRuleValue = (ruleValue, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE,
  ruleValue,
  clauseIndex,
  queryIndex
})

export const changeRuleValueFlags = (ruleValueFlags, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE_FLAGS,
  ruleValueFlags,
  clauseIndex,
  queryIndex
})

// mutate

export const addMutation = (clauseIndex) => ({
  type: constants.MUTATION_ADD,
  clauseIndex
})

export const activateMutation = (active, clauseIndex, ruleIndex) => ({
  type: constants.MUTATION_ACTIVATE,
  active,
  clauseIndex,
  ruleIndex
})

export const mutationChangeRule = (rule, clauseIndex, ruleIndex) => ({
  type: constants.MUTATION_CHANGE_RULE,
  rule,
  clauseIndex,
  ruleIndex
})

export const mutationChangeRuleValue = (ruleValue, clauseIndex, ruleIndex) => ({
  type: constants.MUTATION_CHANGE_RULE_VALUE,
  ruleValue,
  clauseIndex,
  ruleIndex
})

export const addAttr = (attrKey, attrVal, index) => ({
  type: constants.MUTATION_ADD_ATTR,
  attrKey,
  attrVal,
  index
})

export const removeAttrByKey = (attrKey, index) => ({
  type: constants.MUTATION_REMOVE_ATTR_BY_KEY,
  attrKey,
  index
})

export const removeAttrByValue = (attrVal, index) => ({
  type: constants.MUTATION_REMOVE_ATTR_BY_VALUE,
  attrVal,
  index
})

export const removeAllAttrs = (index) => ({
  type: constants.MUTATION_REMOVE_ALL_ATTRS,
  index
})
