import * as constants from '../constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { QUERY, MUTATION, defaultMutation } from '../settings/config'
import { errorHandler, mapMutations, reduceRuleProp, mutationDenormalizer } from './util'
import { bindConstantsToReducers } from '~/src/util'

export default bindConstantsToReducers({
  [constants.MUTATION_ADD]: (state, {clauseIndex}) => ({
    ...state,
    clauses: state.clauses.map((c, i) => i !== clauseIndex ? c : {
      ...c, mutations: [...c.mutations, defaultMutation]
    })
  }),
  [constants.MUTATION_REMOVE]: (state, {clauseIndex, ruleIndex}) => ({
    ...state,
    clauses: state.clauses.map((c, i) =>  i !== clauseIndex ? c : {
      ...c, mutations: c.mutations.filter((r, j) => j !== ruleIndex)
    })
  }),
  [constants.MUTATION_TOGGLE]: (state, action) => reduceRuleProp('mutations', state, action, 'active'),
  [constants.MUTATION_CHANGE_BEHAVIOR]: (state, action) => reduceRuleProp('mutations', state, action, 'behavior'),
  [constants.MUTATION_CHANGE_RULE]: (state, action) => reduceRuleProp('mutations', state, action, 'rule'),
  [constants.MUTATION_CHANGE_RULE_VALUE]: (state, action) => reduceRuleProp('mutations', state, action, 'ruleValue'),
  [constants.MUTATION_CHANGE_RULE_VALUE_FLAGS]: (state, action) => reduceRuleProp('mutations', state, action, 'ruleValueFlags'),
  [constants.MUTATION_CHANGE_TARGET_VALUE]: (state, action) => reduceRuleProp('mutations', state, action, 'targetValue')
})
