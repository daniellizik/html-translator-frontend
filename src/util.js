export const chainReducers = (state, action, ...reducers) => {
  return reducers.reduce((reducedState, reducer) => {
    return reducer(reducedState, action)
  }, state)
}

export const chainActions = (initialState, reducer, ...actions) => {
  const state = Array.isArray(initialState) ? initialState.slice(-1).pop() : initialState
  return actions.reduce((acc, action) => {
    let result
    if (typeof action === 'object')
      result = reducer(acc.state, action)
    else if (typeof action === 'function')
      result = action(acc.state)
    return {
      state: result,
      history: [...acc.history, result]
    }
  }, {state, history: [state]}).history
}

export const bindConstantsToReducers = (reducers, initialState) => (state, action) => {
  return reducers[action.type] 
    ? reducers[action.type](state, action) 
    : (state || initialState)
}

export const chainDispatches = (store, ...actions) => {
  return actions.reduce((acc, action) => {

  }, [])
}

export const filterText = (node) => {
  return !/^[\s\r\n]{0,}$/.test(node.value)
}

export const stringifyMutated = (xml) => {
  return xml.reduce((acc, {node, row, tokens}) => {
    const depth = new Array(node.depth).fill('  ').join('')
    const line = tokens.map(t => t.value).join('')
    return [...acc, depth + line]
  }, []).join('\n')
}

export const findHtmlRoot = (ast) => ast.childNodes[0]
