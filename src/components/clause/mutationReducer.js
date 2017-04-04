import * as clauseConstants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { QUERY, MUTATION, defaultMutation } from './config'
import { mapMutations } from './subReducers'

export default function mutationReducer(state, action) {

  let nextState = state

  if (action.type === clauseConstants.MUTATION_ADD)
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => {
        return i !== action.clauseIndex ? c : {
          ...c,
          rules: [...c.rules, defaultMutation]
        }
      })
    }

  else if (action.type === clauseConstants.MUTATION_ACTIVATE)
    nextState = {
      ...state,
      clauses: state.clauses.map((c, i) => (
        i !== action.clauseIndex ? c : {
          ...c,
          rules: c.rules.map((r, j) => (
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
        rules: c.rules.map((r, j) => j !== action.ruleIndex ? r : {
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
        rules: c.rules.map((r, j) => j !== action.ruleIndex ? r : {
          ...r,
          ruleValue: action.ruleValue
        })
      })
    }

  else if (action.type === clauseConstants.REMOVE_ATTR_BY_KEY)
    nextState = mapMutations(state, (model) => ({
      ...model,
      attrs: model.attrs.filter(attr => attr.name !== action.attrKey)
    }))

  else if (action.type === clauseConstants.REMOVE_ATTR_BY_VALUE)
    nextState = mapMutations(state, (model) => ({
      ...model,
      attrs: model.attrs.filter(attr => attr.value !== action.attrVal)
    }))

  else if (action.type === clauseConstants.ADD_ATTR)
    nextState = mapMutations(state, (model) => ({
      ...model,
      attrs: [
        ...model.attrs,
        { name: constants.attrKey, value: constants.attrVal }
      ]
    }))

  else if (action.type === clauseConstants.REMOVE_ALL_ATTRS)
    nextState = mapMutations(state, (model) => ({ ...model, attrs: [] }))

  return nextState

}

