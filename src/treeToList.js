const defaultConfig = {
  childrenProp: 'childNodes',
  attributesProp: 'attrs',
  nodeNameProp: 'nodeName',
  valueProp: 'value',
  commentProp: 'data'
}

const getData = (node, config) => {
  if (node.nodeName === '#text')
    return node[config.valueProp] ? node[config.valueProp].replace(/[\r\n]/g, '').trim() : null
  else if (node.nodeName === '#comment')
    return node[config.commentProp] ? node[config.commentProp].replace(/[\r\n]/g, '').trim() : null
}

/**
 * Takes configuration (different AST generators have different specs)
 *
 * @prop {string} childrenProp - name of property assigned to childNodes
 * @prop {string} attributesProp - name of property assigned to attrs
 * @prop {string} nodeNameProp - name of property assigned to nodeName
 * @returns {function} walk - recursive tree-traversal reduce function
 */
export default function treeToList(config = defaultConfig) {

  /**
   * Takes xml AST and converts to flat list.
   * The flat list is a line-by-line representation of the visual output of the xml.
   * Closing tags are included in the last and have "type" {string} of "close".
   *
   *
   * @param {object} node - current AST node in tree
   * @param {object} parent - parent node
   * @param {array} list - recursive accumulation of nodes
   * @param {number} depth - current node tree depth
   * @param {number} parentId - array index of parent node, -1 if root
   * @param {boolean} isLastSibling - is the current node the last in its childNodes array
   * @returns {array} flattened list of AST nodes
   */
  return function walk(node, parent, accumulator = {open: [], list: []}, depth = 0, parentId = -1, isLastSibling = true) {

    const props = {
      depth,
      parent: parentId,
      nodeName: node[config.nodeNameProp].toLowerCase(),
      value: getData(node, config),
      attrs: node[config.attributesProp] || [],
      id: accumulator.open.length
    }
    const length = accumulator.open.push(props) - 1
    const children = node[config.childrenProp]
    accumulator.list.push(props)

    // no children assumes self-closing tag, takes id of node
    if ((children || []).length < 1) {
      return { ...accumulator, list: [...accumulator.list, {...props, close: true, id: length}] }
    }

    // recurse on children
    if (children || (isLastSibling && parent)) {
      return children.reduce((acc, child, i, siblings) => {
        const lastSibling = i === siblings.length - 1
        const branch = walk(child, {...node, ...props}, acc, depth + 1, accumulator.open.length - 1, lastSibling)
        if (!lastSibling)
          return branch
        // last siblings (with or without children) take id of most recent parent
        else
          return { ...branch, list: [...branch.list, {...props, close: true, id: length}] }
      }, accumulator)
    }

  }

}
