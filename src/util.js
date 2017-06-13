import { parse } from 'parse5'
import treeToList from '~/src/treeToList'

export const omit = (obj, ...keys) => Object.keys(obj).reduce((acc, k) => {
  return keys.indexOf(k) > -1 ? acc : {...acc, [k]: obj[k]} 
}, {})

export const parseHtml = (rawHtml) => {
  const ast = parse(rawHtml).childNodes[0]
  const list = treeToList()(ast)
  return {ast, list}
}

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

/**
 * bindConstantsToReducers - each constant becomes its own sub-reducer
 * @param {object} reducers - dictionary of functions bound to constant names
 * @param {object} initialState - optional initial state to pass to reducers
 * @returns {function} reducer - redux reducer
 */
export const bindConstantsToReducers = (reducers = {}, initialState = {}) => (state, action) => {
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

// notes 1
export const presortList = (list) => {
  return list.reduce((acc, node) => {
    if (node.nodeName === '#text')
      return {
        ...acc,
        TEXT: [...acc.TEXT, node]
      }
    else if (node.nodeName === '#comment')
      return {
        ...acc,
        COMMENT: [...acc.COMMENT, node]
      }
    else
      return {
        ...acc,
        ATTR_KEY: [...acc.ATTR_KEY, node],
        ATTR_VAL: [...acc.ATTR_VAL, node],
        NODE_NAME: [...acc.NODE_NAME, node]
      }
  }, {COMMENT: [], TEXT: [], NODE_NAME: [], ATTR_KEY: [], ATTR_VAL: []})
}