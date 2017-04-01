import * as clauseConstants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { query, mutator } from './config'
import queryReducer from './queryReducer'
import mutationReducer from './mutationReducer'
import { reduceView } from './subReducers'

export default function(state, action) {

  let nextState = state

  // adding a clause by default
  // inserts one default query, no mutations
  if (action.type === clauseConstants.CLAUSE_ADD) {
    const clauses = [
      ...state.clauses, 
      { name: '', rules: [query.defaultQuery] }
    ]
    const view = reduceView(action, clauses, state.slave)
    nextState = {
      ...state,
      slave: {
        ...state.slave,
        view
      },
      clauses
    }
  }

  else if (action.type === clauseConstants.CLAUSE_REMOVE) {
    const clauses = state.clauses.filter((c, i) => i !== action.clauseIndex)
    const view = reduceView(action, clauses, state.slave)
    nextState = {
      ...state,
      slave: {
        ...state.slave,
        view
        // mutated: reduceMutated(action, clauses, state.slave)
      },
      clauses
    }
  }

  else if (action.type === clauseConstants.CLAUSE_CHANGE_NAME) 
    nextState = {
      ...state,
      clauses: state.clauses.map((clause, clauseIndex) => {
        return clauseIndex !== action.clauseIndex ? clause : { ...clause, name: action.name }
      })
    }

  // remove all clauses, reset everything
  else if (action.type === sourceSetterConstants.HTML_FETCHED)
    nextState = { 
      ...state,
      slave: {
        ...state.slave,
        view: [],
        mutated: []
      },
      clauses: []
    }

  else if (action.type.indexOf('QUERY_') > -1)
    nextState = queryReducer(state, action)
    
  else if (action.type.indexOf('MUTATION_') > -1)
    nextState = mutationReducer(state, action)

  return nextState

}
