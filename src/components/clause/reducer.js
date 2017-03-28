import * as clauseConstants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { query, mutator } from './config'
import queryReducer from './queryReducer'
import mutationReducer from './mutationReducer'

export default function(state, action) {

  let result = state

  // adding a clause by default
  // inserts one default query, no mutations
  if (action.type === clauseConstants.CLAUSE_ADD)
    result = {
      ...state,
      clauses: [
        ...state.clauses,
        [query.defaultQuery]
      ]
    }

  else if (action.type === clauseConstants.CLAUSE_REMOVE) {
    let clauses = state.clauses.filter((c, i) => i !== action.index)
    result = {
      ...state,
      slave: {
        ...state.slave,
        view: reduceView(action, clauses, state.slave),
        mutated: reduceMutated(action, clauses, state.slave)
      },
      clauses
    }
  }

  // remove all clauses, reset everything
  else if (action.type === sourceSetterConstants.HTML_FETCHED)
    result = { 
      ...state,
      slave: {
        ...state.slave,
        view: [],
        mutated: []
      },
      clauses: []
    }

  else if (action.type.indexOf('QUERY_') > -1)
    result = queryReducer(state, action)
    
  else if (action.type.indexOf('MUTATION_') > -1)
    result = mutationReducer(state, action)

  return result

}
