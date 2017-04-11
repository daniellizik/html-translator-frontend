import * as clauseConstants from '../constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { QUERY, MUTATION, defaultMutation } from '../settings/config'
import { errorHandler, mapMutations, reduceRuleProp, mutationDenormalizer } from './util'

export default function mutationReducer(state, action) {

  let nextState = state

  if (action.type === clauseConstants.MUTATION_ADD) {
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => i !== action.clauseIndex ? c : {
        ...c,
        mutations: [...c.mutations, defaultMutation]
      })
    }
  }

  else if (action.type === clauseConstants.MUTATION_REMOVE)
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => (
        i !== action.clauseIndex ? c : {
          ...c,
          mutations: c.mutations.filter((r, j) => j !== action.ruleIndex)
        }
      ))
    }

  else if (action.type === clauseConstants.MUTATION_DENORMALIZE) {
    try {
      nextState = {
        ...state,
        slave: {
          ...state.slave,
          currentMutation: action.clauseIndex,
          mutated: action.clauseIndex < 0 ? [] : mutationDenormalizer(
            state.clauses[action.clauseIndex].target,
            state.clauses[action.clauseIndex].view, 
            state.slave.list.list,
            state.clauses[action.clauseIndex].mutations
          )
        }
      }
    }
    catch(e) {
      process.env.NODE_ENV === 'development' && console.warn('error', e)
      nextState = {
        ...state,
        error: errorHandler(action, e)
      }
    }
  }

  else if (action.type === clauseConstants.MUTATION_TOGGLE)
    nextState = reduceRuleProp('mutations', state, action, 'active')

  else if (action.type === clauseConstants.MUTATION_CHANGE_BEHAVIOR)
    nextState = reduceRuleProp('mutations', state, action, 'behavior') 

  else if (action.type === clauseConstants.MUTATION_CHANGE_RULE)
    nextState = reduceRuleProp('mutations', state, action, 'rule') 

  else if (action.type === clauseConstants.MUTATION_CHANGE_RULE_VALUE)
    nextState = reduceRuleProp('mutations', state, action, 'ruleValue') 

  else if (action.type === clauseConstants.MUTATION_CHANGE_RULE_VALUE_FLAGS)
    nextState = reduceRuleProp('mutations', state, action, 'ruleValueFlags')

  else if (action.type === clauseConstants.MUTATION_CHANGE_TARGET_VALUE)
    nextState = reduceRuleProp('mutations', state, action, 'targetValue') 

  else if (action.type === clauseConstants.REMOVE_ATTR_BY_KEY)
    nextState = state

  else if (action.type === clauseConstants.REMOVE_ATTR_BY_VALUE)
    nextState = state

  else if (action.type === clauseConstants.ADD_ATTR)
    nextState = state

  else if (action.type === clauseConstants.REMOVE_ALL_ATTRS)
    nextState = state

  return nextState

}

