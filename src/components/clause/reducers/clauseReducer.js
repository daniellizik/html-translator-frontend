import * as constants from '../constants'
import { defaultClause } from '../config'
import { reduceView } from './util'

export default function(state, action) {

  let nextState = state

  if (action.type === constants.CLAUSE_ADD) {
    const nextClauses = [ 
      ...state.clauses, 
      defaultClause
    ]
    const clauses = reduceView({...action, clauseIndex: nextClauses.length - 1}, nextClauses, state.slave)
    nextState = {
      ...state,
      clauses
    }
  }

  else if (action.type === constants.CLAUSE_VIEW_MUTATIONS)
    nextState = {
      ...state,
      slave: {
        ...state.slave,
        currentMutation: action.currentMutation
      }
    }

  else if (action.type === constants.CLAUSE_REMOVE_ALL) {
    nextState = {
      ...state,
      activeClause: -1,
      clauses: []
    }
  }

  else if (action.type === constants.CLAUSE_REMOVE) {
    const nextClauses = state.clauses.filter((c, i) => i !== action.clauseIndex)
    nextState = {
      ...state,
      activeClause: action.clauseIndex < 1 ? null : action.clauseIndex - 1,
      clauses: nextClauses
    }
  }

  else if (action.type === constants.CLAUSE_CHANGE_NAME) 
    nextState = {
      ...state,
      clauses: state.clauses.map((clause, clauseIndex) => {
        return clauseIndex !== action.clauseIndex ? clause : { ...clause, name: action.name }
      })
    }

  // remove all clauses, reset everything
  else if (action.type === constants.HTML_FETCHED)
    nextState = { 
      ...state,
      slave: {
        ...state.slave,
        view: [],
        mutated: []
      },
      clauses: []
    }

  return nextState

}
