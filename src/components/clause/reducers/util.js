import * as constants from '../constants'
import * as targets from '../settings/targets'
import * as rules from '../settings/rules'
import * as behaviors from '../settings/behaviors'
import { targetMap } from '../settings/config'

export const errorHandler = (action, {message}) => {
  return message
}

// take view, mutations and apply them to FULL LIST, not open
// this makes it easier for xml tree to consume (it just spits out entire list)
export const mutationDenormalizer = (clauseTarget, view = [], list = [], mutations = []) => {
  // mutations might have to mutate entire list, so give a copy to keep it immutable
  const result = list.slice().reduce((acc, node, i, arr) => {
    // only mutate items in view
    return view.indexOf(node.id) < 0 ? [...acc, node] : [
      ...acc,
      // this needs to account for mutation behavior
      mutations.reduce((mutatedNode, mutation) => {
        const target = targetMap[clauseTarget]
        const params = {...mutation, before: mutatedNode[target]}
        const ruleResult = rules[mutation.rule](params)
        // todo: implement this
        // const behaviorResult = behaviors[mutation.behavior](mutatedNode, mutation, arr, ruleResult)
        return {
          ...mutatedNode,
          [target]: ruleResult
        }
      }, {...node})
    ] 
  }, [])
  return result
}

export const reduceRuleProp = (ruleType, state, action, prop) => {
  return {
    ...state,
    clauses: state.clauses.map((c, i) => (
      i !== action.clauseIndex ? c : {
        ...c,
        [ruleType]: c[ruleType].map((r, j) => (
          j !== action.ruleIndex ? r : {
            ...r,
            [prop]: action[prop]
          }
        ))
      }
    ))
  }
}

export const reduceView = (action, clauses, {list}) => {
  return clauses.reduce((acc, clause, index) => {
    if (index !== action.clauseIndex)
      return [...acc, clause]
    const view = list.open.reduce((ids, node) => {
      const clauseResult = clause.queries.reduce((bool, obj) => {
        const targetResult = targets.query[clause.target](node, {...obj, rule: rules[obj.rule]})
        if (targetResult === false || bool === false)
          return false
        else if (targetResult === true)
          return true
      }, null)
      return !clauseResult ? ids : [...ids, node.id]
    }, [])
    return [
      ...acc,
      { ...clause, view }
    ]
  }, [])
}

export const reduceClauses = (state, action, key) => {
  let nextState
  const clauses = state.clauses.map((clause, clauseIndex) => {
    return clauseIndex !== action.clauseIndex ? clause : {
      ...clause,
      queries: clause.queries.map((query, ruleIndex) => {
        return ruleIndex !== action.ruleIndex ? query : { ...query, [key]: action[key] }
      })
    }
  })
  try {
    nextState = {
      ...state,
      clauses: reduceView(action, clauses, state.slave)
    }
  }
  catch(e) {
    process.env.NODE_ENV === 'development' && console.warn('error', e)
    return {
      ...state,
      clauses,
      error: errorHandler(action, e)
    }
  }
  return nextState
}