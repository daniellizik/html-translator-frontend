/**
 * chainReducers
 * @param {object} state
 * @param {object} action
 * @param {array} reducers
 * @return {object} state reduced after n reductions
 */
export function chainReducers(state, action, ...reducers) {
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
export function chainActions(initialState, reducer, ...actions) {
  return actions.reduce((acc, action, i) => {
    const result = reducer(acc.state, action)
    return {
      state: result,
      history: [...acc.history, result]
    }
  }, {state: initialState, history: [initialState]}).history
}