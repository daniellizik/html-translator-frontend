import * as clauseConstants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { query, mutator } from './config'
import { mapMutations } from './subReducers'

export default function mutationReducer(state, action) {
  let result = state

  if (action.type === clauseConstants.REMOVE_ATTR_BY_KEY)
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

  return result
}

