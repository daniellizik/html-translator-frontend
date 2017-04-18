const defaultConfig = {
  childrenProp: 'childNodes',
  attributesProp: 'attrs',
  nodeNameProp: 'nodeName',
  valueProp: 'value',
  parentProp: 'parent',
  idProp: 'id'
}

export default function treeToList(config = defaultConfig) {
  return function walk(list = [], curr = 0, tree = {...list[0], [config.childrenProp]: []}) {
    return {
      ...tree,
      [config.childrenProp]: [
        ...tree[config.childrenProp],
        // bad time complexity
        list.find(c => c[config.parentProp] === c[config.idProp])
      ]
    }
  }
}