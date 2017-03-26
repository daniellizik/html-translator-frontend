import * as clauseConstants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { constants as navigatorConstants } from '~/src/components/navigator'
import config from './config'
import { reduceView, reduceMutated, reduceClause, mapMutations } from './subReducers'

export default function(state, action) {

  let result
  const { stateKey } = action
  const domain = state[stateKey]

  // remove all clauses
  if (action.type === sourceSetterConstants.HTML_FETCHED)
    result = {
      ...state,
      querybuilder: {
        clauses: []
      }
    }

  else if (action.type === clauseConstants.ADD_CLAUSE)
    result = {
      ...state,
      [stateKey]: {
        ...domain,
        clauses: [
          ...domain.clauses,
          config[stateKey].defaultClause
        ]
      }
    }

  else if (action.type === clauseConstants.REMOVE_CLAUSE) {
    let clauses = domain.clauses.filter((c, i) => i !== action.index)
    result = {
      ...state,
      slave: {
        ...state.slave,
        view: reduceView(action, clauses, state.slave),
        mutated: reduceMutated(action, clauses, state.slave)
      },
      [stateKey]: {
        ...domain,
        clauses
      }
    }
  }

  else if (action.type === clauseConstants.REMOVE_ATTR_BY_KEY)
    result = mapMutations(state, (model) => ({
      ...model,
      attrs: model.attrs.filter(attr => attr.name !== action.attrKey)
    }))

  else if (action.type === clauseConstants.REMOVE_ATTR_BY_VALUE)
    result = mapMutations(state, (model) => ({
      ...model,
      attrs: model.attrs.filter(attr => attr.value !== action.attrVal)
    }))

  else if (action.type === clauseConstants.ADD_ATTR)
    result = mapMutations(state, (model) => ({
      ...model,
      attrs: [
        ...model.attrs,
        { name: constants.attrKey, value: constants.attrVal }
      ]
    }))

  else if (action.type === clauseConstants.REMOVE_ALL_ATTRS)
    result = mapMutations(state, (model) => ({ ...model, attrs: [] }))

  else if (action.type === clauseConstants.CHANGE_RULE)
    result = reduceClause(state, action, 'rule')

  else if (action.type === clauseConstants.CHANGE_RULE_VALUE)
    result = reduceClause(state, action, 'ruleValue')

  else if (action.type === clauseConstants.CHANGE_REGEX)
    result = reduceClause(state, action, 'regex')

  // when user switches target or rule
  // need to clear the ruleValue, targetValue and input
  else if (action.type === clauseConstants.CHANGE_TARGET)
    result = reduceClause(state, action, 'target')

  else if (action.type === clauseConstants.CHANGE_TARGET_VALUE)
    result = reduceClause(state, action, 'targetValue')

  else if (action.type === clauseConstants.CHANGE_FLAGS)
    result = reduceClause(state, action, 'flags')

  else if (action.type === clauseConstants.CHANGE_INPUT)
    result = reduceClause(state, action, 'input')

  else
    result = state

  return result

}
