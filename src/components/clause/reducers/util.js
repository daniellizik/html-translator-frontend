import * as targets from '../settings/targets'
import * as rules from '../settings/rules'
import * as constants from '../constants'
import * as behaviors from '../settings/behaviors'
import { targetMap } from '../settings/config'

// take view, mutations and apply them to FULL LIST, not open
// this makes it easier for xml tree to consume (it just spits out entire list)
export const mutationDenormalizer = (view = [], list = [], mutations = []) => {
  // mutations might have to mutate entire list, so give a copy to keep it immutable
  const result = list.slice().reduce((acc, node, i, arr) => {
    // only mutate items in view
    return view.indexOf(node.id) < 0 ? [...acc, node] : [
      ...acc,
      // this needs to account for mutation behavior
      mutations.reduce((mutatedNode, mutation) => {
        const target = targetMap[mutation.target]
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

export const reduceView = ({clauseIndex}, clauses, {list}) => {
  return clauses.reduce((acc, clause, index) => {
    if (index !== clauseIndex)
      return [...acc, clause]
    const view = list.open.reduce((ids, node) => {
      const clauseResult = clause.queries.reduce((bool, obj) => {
        const targetResult = targets.query[obj.target](node, {...obj, rule: rules[obj.rule]})
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
  const nextClauses = state.clauses.map((clause, clauseIndex) => {
    return clauseIndex !== action.clauseIndex ? clause : {
      ...clause,
      queries: clause.queries.map((query, ruleIndex) => {
        return ruleIndex !== action.ruleIndex ? query : { ...query, [key]: action[key] }
      })
    }
  })
  let clauses = nextClauses
  try {
    nextState = {
      ...state,
      clauses: reduceView(action, nextClauses, state.slave)
    }
  }
  catch(e) {
    console.warn('error', e)
    return {
      ...state,
      clauses,
      // todo: this needs work, use declarative config
      // this should be result of validation error methods
      // validation reducers should dispatch actions
      // that form UI will react to
      error: (() => {
        if (e.message.includes('Invalid regular expression'))
          return constants.CLAUSE_INVALID_REGEXP
        else if (e.message.includes('Attribute key cannot contain spaces'))
          return constants.CLAUSE_INVALID_ATTRKEY
      })()
    }
  }
  return nextState
}