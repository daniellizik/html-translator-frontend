export const query = {

  nodeName: (node, {rule, targetValue}) => {
    const before =  node.nodeName === '#text' ? 'text' : node.nodeName
    return rule({ before, targetValue })
  },

  text: ({nodeName, value}, comparator) => {
    return nodeName !== '#text'
      ? false
      : comparator.rule({ ...comparator, before: value })
  },

  attrKey: ({attrs}, comparator) => {
    return attrs.reduce((acc, attr) => {
      const result = comparator.rule({...comparator, before: attr.name})
      if (result === true)
        return true
      else if (result === false || acc === false)
        return false
    }, null)
  },

  attrVal: ({attrs}, comparator) => {
    return attrs.reduce((acc, attr) => {
      const result = comparator.rule({...comparator, before: attr.value})
      if (result === true || acc === true)
        return true
      else if (result === false && acc === false)
        return false
    }, null)
  },

  // this is going to be hell to setup
  parent: (node, comparator) => {},
  child: (node, comparator) => {}

}

export const mutator = {

  nodeName: (model, tree, params) => {
    const compare = { ...params, before: model.nodeName }
    return { ...model, nodeName: params.rule(compare) }
  },

  text: (model, tree, params) => {
    const compare = { ...params, before: model.text }
    return { ...model, text: params.rule(compare) }
  },

  attrKey: (model, tree, params) => {
    return {
      ...model,
      attrs: (model.attrs || []).map(a => {
        if (a.name !== params.targetValue)
          return a
        return { ...a, name: params.rule({ ...params, before: a.name }) }
      })
    }
  },

  attrVal: (model, tree, params) => {
    return {
      ...model,
      attrs: (model.attrs || []).map(a => {
        if (a.value !== params.targetValue)
          return a
        return { ...a, value: params.rule({ ...params, before: a.value }) }
      })
    }
  },

  addAttr: (model, tree, params) => {
    const compare = { ...params, before: 1 }
    return { ...model, a: params.rule(compare) }
  }

}
