import * as clauseConstants from './constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { defaultQuery, mutator } from './config'
import queryReducer from './queryReducer'
import mutationReducer from './mutationReducer'
import { reduceView } from './subReducers'

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

  if (action.type === clauseConstants.CLAUSE_ADD) {
    const nextClauses = [ 
      ...state.clauses, 
      { active: false, minimized: false, name: '', rules: [defaultQuery] } 
    ]
    const clauses = reduceView({...action, clauseIndex: nextClauses.length - 1}, nextClauses, state.slave)
    nextState = {
      ...state,
      clauses
    }
  }

  else if (action.type === clauseConstants.CLAUSE_REMOVE_ALL) {
    nextState = {
      ...state,
      activeClause: -1,
      clauses: []
    }
  }

  else if (action.type === clauseConstants.CLAUSE_REMOVE) {
    const nextClauses = state.clauses.filter((c, i) => i !== action.clauseIndex)
    nextState = {
      ...state,
      activeClause: action.clauseIndex < 1 ? null : action.clauseIndex - 1,
      clauses: nextClauses
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
