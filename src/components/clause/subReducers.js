import * as actions from './actions'
import * as targets from './targets'
import * as rules from './rules'

export function reduceMutated(action, clauses, {view, tree, mutated}) {
  if (action.stateKey === 'mutator')
    return view.map(updatedView => {
      return clauses.reduce((model, clause) => {
        const params = { ...clause, ...action, rule: rules[clause.rule] }
        // merged child/parent object in case of text node
        // text node is basically the parent, but with a text property
        // but we dont need this if model user is searching for
        // is not a text node
        const family = model.nodeName === '#text' ? {
          ...tree[model.parent],
          text: model.text,
          child: updatedView.id
        } : model
        return targets.mutator[clause.target](family, tree, params)
      }, updatedView)
    })
  else
    return mutated
}

export function reduceView({clauseIndex}, clauses, {list}) {
  return clauses.reduce((acc, clause, index) => {
    if (index !== clauseIndex)
      return [...acc, clause]
    const view = list.open.filter(node => clause.rules.reduce((acc, obj, i) => {
      const result = targets.query[obj.target](node, { ...obj, rule: rules[obj.rule] })
      if (result === false || acc === false)
        return false
      else if (result === true)
        return true
    }, null))
    const _view = list.open.reduce((ids, node) => {
      const res = clause.rules.reduce((bool, obj) => {
        const result = targets.query[obj.target](node, { ...obj, rule: rules[obj.rule] })
        if (result === false || bool === false)
          return false
        else if (result === true)
          return true
      }, null)
      return !res ? ids : [...ids, node.id]
    }, [])
    return [
      ...acc,
      { ...clause, view, _view }
    ]
  }, [])
}

export function reduceClauses(state, action, type, key) {
  let nextState
  const nextClauses = state.clauses.map((clause, clauseIndex) => {
    return clauseIndex !== action.clauseIndex ? clause : {
      ...clause,
      rules: clause.rules.map((query, queryIndex) => {
        return queryIndex !== action.queryIndex ? query : { ...query, [key]: action[key] }
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
          return actions.CLAUSE_INVALID_REGEXP
        else if (e.message.includes('Attribute key cannot contain spaces'))
          return actions.CLAUSE_INVALID_ATTRKEY
      })()
    }
  }
  return nextState
}

export function mapMutations(state, callback) {
  return {
    ...state,
    slave: {
      ...state.slave,
      mutated: state.slave.mutated.map(callback)
    }
  }
}
