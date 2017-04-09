import * as targets from '../targets'
import * as rules from '../rules'
import * as constants from '../constants'
import { targetMap } from '../config'

// take view, mutations and apply them to FULL LIST, not open
// this makes it easier for xml tree to consume (it just spits out entire list)
export const mutationDenormalizer = (view = [], list = [], mutations = []) => {
  const result = list.reduce((acc, node) => {
    // only mutate items in view
    return view.indexOf(node.id) < 0 ? [...acc, node] : [
      ...acc,
      mutations.reduce((mutatedNode, mutation) => {
        const target = targetMap[mutation.target]
        const params = {...mutation, before: mutatedNode[target]}
        mutatedNode[target] = rules[mutation.rule](params)
        return mutatedNode
      }, {...node})
      // {
      //   ...node,
      //   ((node) => {

      //   })(node)
      //   // need to dynamically set key, could be nodeName or value
      //   // or an attr prop
      //   // need query target for this
      //   // value: mutations.reduce((mutated, mutation) => {
      //   //   console.log(mutation)
      //   //   // this is where the before api stuff gets set
      //   //   const params = {...mutation, before: mutated}
      //   //   return rules[mutation.rule](params)
      //   // }, node.value)
      //   [config.targetMap[]]: mutations.reduce((mutated, mutation) => {
      //     console.log(mutation)
      //     // this is where the before api stuff gets set
      //     const params = {...mutation, before: mutated}
      //     return rules[mutation.rule](params)
      //   }, node.value)
      // }
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