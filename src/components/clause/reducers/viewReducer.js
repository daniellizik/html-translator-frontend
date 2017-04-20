import * as constants from '../constants'
import { mutateList } from './util'
import { bindConstantsToReducers } from '~/src/util'

// todo: move this to reducer using slave.view
// similar to denormalize mutations, it needs to denormalize the whole list
// not just open tags
export default function viewReducer(state, action) {

  let nextState = state

  if (action.type.indexOf('@CLAUSE') < 0)
    return nextState

  else if (state.clauses[state.activeClause] && state.slave.currentMutation < 0)
    return {
      ...state,
      slave: {
        ...state.slave,
        view: mutateList(
          state.slave.list.list, 
          state.clauses[state.activeClause].view
        )
      }
    }

  else if (state.clauses.length > 0 && state.activeClause > -1)
    return {
      ...state,
      slave: {
        ...state.slave,
        view: mutateList(
          state.slave.mutated, 
          (state.clauses[state.activeClause] || {}).view || []
        )
      }
    }

  else if (state.activeClause === -1)
    return {
      ...state,
      slave: {
        ...state.slave,
        view: mutateList(
          state.slave.mutated,
          state.clauses.reduce((a, c) => {
            return [...a, ...c.view.reduce((b, n) => {
              return a.indexOf(n) > -1 ? b : [...b, n]
            }, [])]
          }, [])
        )
      }
    }

  else
    return {
      ...state,
      slave: {
        ...state.slave,
        view: mutateList(
          state.slave.list.list, 
          []
        )
      }
    }

  return nextState

}