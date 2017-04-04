import * as clauseConstants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { QUERY, MUTATION, defaultMutation } from './config'
import { mapMutations } from './subReducers'

export default function mutationReducer(state, action) {

  let nextState = state

  if (action.type === clauseConstants.MUTATION_ADD) {
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => i !== action.clauseIndex ? i : {
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

  else if (action.type === clauseConstants.MUTATION_ACTIVATE)
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => (
        i !== action.clauseIndex ? c : {
          ...c,
          mutations: c.mutations.map((r, j) => (
            j !== action.ruleIndex ? r : {
              ...r,
              active: action.active
            }
          ))
        }
      ))
    }

  else if (action.type === clauseConstants.REMOVE)
    nextState = state

  else if (action.type === clauseConstants.MUTATION_CHANGE_RULE)
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => i !== action.clauseIndex ? c : {
        ...c,
        mutations: c.mutations.map((r, j) => j !== action.ruleIndex ? r : {
          ...r,
          rule: action.rule
        })
      })
    }  

  else if (action.type === clauseConstants.MUTATION_CHANGE_RULE_VALUE)
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => i !== action.clauseIndex ? c : {
        ...c,
        mutations: c.mutations.map((r, j) => j !== action.ruleIndex ? r : {
          ...r,
          ruleValue: action.ruleValue
        })
      })
    }

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

