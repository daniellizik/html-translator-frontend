export const query = {

  NODE_NAME: (node, {rule, targetValue}) => {
    const before =  node.nodeName === '#text' ? 'text' : node.nodeName
    return rule({ before, targetValue })
  },

  TEXT: ({nodeName, value}, comparator) => {
    return nodeName !== '#text'
      ? false
      : comparator.rule({ ...comparator, before: value })
  },

  ATTR_KEY: ({attrs}, comparator) => {
    return attrs.reduce((acc, attr) => {
      const result = comparator.rule({...comparator, before: attr.name})
      if (acc === true || result === true)
        return true
      else if (result === false || acc === false)
        return false
    }, null)
  },

  ATTR_VAL: ({attrs}, comparator) => {
    return attrs.reduce((acc, attr) => {
      const result = comparator.rule({...comparator, before: attr.value})
      if (result === true || acc === true)
        return true
      else if (result === false && acc === false)
        return false
    }, null)
  },

  // this is going to be hell to setup
  PARENT: (node, comparator) => {},
  CHILD: (node, comparator) => {}

}

export const mutator = {

  NODE_NAME: (model, tree, params) => {
    const compare = { ...params, before: model.nodeName }
    return { ...model, nodeName: params.rule(compare) }
  },

  TEXT: (model, tree, params) => {
    const compare = { ...params, before: model.text }
    return { ...model, text: params.rule(compare) }
  },

  ATTR_KEY: (model, tree, params) => {
    return {
      ...model,
      attrs: (model.attrs || []).map(a => {
        if (a.name !== params.targetValue)
          return a
        return { ...a, name: params.rule({ ...params, before: a.name }) }
      })
    }
  },

  ATTR_VAL: (model, tree, params) => {
    return {
      ...model,
      attrs: (model.attrs || []).map(a => {
        if (a.value !== params.targetValue)
          return a
        return { ...a, value: params.rule({ ...params, before: a.value }) }
      })
    }
  },

  ATTR_CONCAT: (model, tree, params) => {
    const compare = { ...params, before: 1 }
    return { ...model, a: params.rule(compare) }
  }

}
