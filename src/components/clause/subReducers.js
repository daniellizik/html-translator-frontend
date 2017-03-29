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

export function reduceView(action, clauses, {list}) {
  return clauses.reduce((acc, clause, index) => {
    const result = list.filter(node => clause.reduce((acc, obj, i) => {
      if (obj.type !== 'query')
        return acc
      const comparator = { ...obj, rule: rules[obj.rule] }
      const result = targets.query[obj.target](node, comparator)
      if (result === false || acc === false)
        return false
      else if (result === true)
        return true
    }, null))
    return [...acc, result]
  }, [])
}

export function reduceClauses(state, action, key) {
  let nextState
  const clauses = state.clauses.map((clause, clauseIndex) => {
    if (clauseIndex !== action.index)
      return clause
    else
      return clause.map((query, queryIndex) => {
        if (queryIndex !== action.queryIndex)
          return query
        return { ...query, [key]: action[key] }
      })
  })
  try {
    nextState = {
      ...state,
      slave: {
        ...state.slave,

        // this definitely isn't the best time complexity
        // for every clause we add, we start with the original tree
        // and reduce all clauses, all the time, even when
        // we make a modification to one clause,
        // the tree must be filtered several times

        // it's possible to store the state of each tree
        // as it passes through a clause
        // but then we're sacrificing space for time

        view: reduceView(action, clauses, state.slave),
        // mutated: reduceMutated(action, clauses, state.slave)
      },
      [action.stateKey]: {
        ...state[action.stateKey],
        clauses
      }
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
