import * as clauseConstants from '../constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { defaultQuery, defaultClause, mutator } from '../config'
import queryReducer from './queryReducer'
import mutationReducer from './mutationReducer'
import clauseReducer from './clauseReducer'
import { reduceView } from './util'

// by default, adjusting a clause's inputs will set it to active
// those are set implicitly by other actions besides CLAUSE_ACTIVATE
// this root-level reducer is set before the default one for clause
// in rootReducer, since everything clause reducer does depends on 
// activeClause prop (basically)
export function activeClause(state, action) {
  let nextState = state
  if (action.clauseIndex || action.type === clauseConstants.CLAUSE_ACTIVATE)
    nextState = {
      ...state,
      activeClause: action.clauseIndex
    }
  return nextState
}

export default function(state, action) {
  let nextState = state
  if (action.type.indexOf('CLAUSE_') > -1)
    nextState = clauseReducer(state, action)
  else if (action.type.indexOf('QUERY_') > -1)
    nextState = queryReducer(state, action)
  else if (action.type.indexOf('MUTATION_') > -1)
    nextState = mutationReducer(state, action)
  return nextState
}
