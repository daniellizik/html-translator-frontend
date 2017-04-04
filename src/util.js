/**
 * chainReducers
 * @param {object} state
 * @param {object} action
 * @param {array} reducers
 * @return {object} state reduced after n reductions
 */
export const chainReducers = (state, action, ...reducers) => {
  return reducers.reduce((reducedState, reducer) => {
    const result = reducer(reducedState, action)
    return result
  }, state)
}

/**
 * chainActions
 * @param {object} initialState
 * @param {object} reducer
 * @param {array} actions
 * @return {array} array of reduced state per action passed
 */
export const chainActions = (initialState, reducer, ...actions) => {
  const state = Array.isArray(initialState) ? initialState.slice(-1).pop() : initialState
  return actions.reduce((acc, action, i) => {
    const result = reducer(acc.state, action)
    return {
      state: result,
      history: [...acc.history, result]
    }
  }, {state, history: [state]}).history
}

export const filterText = (node) => {
  return !/^[\s\r\n]+$/.test(node.value)
}

export const mutateList = (list, view) => {
  return list.reduce((acc, node) => {
    const index = acc.view.indexOf(node.id)
    return index < 0 
      ? {
          list: [...acc.list, node],
          view: acc.view
        } 
      : {
          list: [...acc.list, {...node, view: true}],
          view: acc.view.splice(index, 1) && acc.view
        } 
  }, { list: [], view: view.slice() }).list
}