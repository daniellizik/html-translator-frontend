export const chainReducers = (state, action, ...reducers) => {
  return reducers.reduce((reducedState, reducer) => {
    const result = reducer(reducedState, action)
    return result
  }, state)
}

export const chainActions = (initialState, reducer, ...actions) => {
  const state = Array.isArray(initialState) ? initialState.slice(-1).pop() : initialState
  return actions.reduce((acc, action) => {
    const result = reducer(acc.state, action)
    return {
      state: result,
      history: [...acc.history, result]
    }
  }, {state, history: [state]}).history
}

export const asyncChainActions = (store, ...actions) => {
  return actions.reduce((acc, action) => {

  }, [])
}

export const filterText = (node) => {
  return !/^[\s\r\n]{0,}$/.test(node.value)
}

export const bindConstantsToReducers = (reducers, initialState) => (state, action) => {
  return reducers[action.type] 
    ? reducers[action.type](state, action) 
    : (state || initialState)
}