'use strict'

const defaultConfig = {
  childrenProp: 'childNodes',
  attributesProp: 'attrs',
  nodeNameProp: 'nodeName',
  valueProp: 'value'
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
   * @param {array} list - recursive accumulation array
   * @param {number} depth - current node tree depth
   * @param {number} parentId - array index of parent node, -1 if root
   * @param {boolean} isLastSibling - is the current node the last in its childNodes array
   * @returns {array} flattened list of AST nodes
   */
  return function walk(node, parent, list = [], depth = 0, parentId = -1, isLastSibling = true) {

    const props = {
      depth,
      parent: parentId,
      nodeName: node[config.nodeNameProp].toLowerCase(),
      value: node[config.valueProp] || null,
      attrs: node[config.attributesProp] || [],
      type: parent ? 'open' : 'root',
      id: list.length
    }
    const length = list.push(props) - 1
    const children = node[config.childrenProp]

    // no children assumes self-closing tag, takes id of node
    if ((children || []).length < 1) {
      return [...list, {...props, type: 'close', id: length}]
    }

    // recurse on children
    if (children || (isLastSibling && parent)) {
      return children.reduce((acc, child, i, siblings) => {
        const lastSibling = i === siblings.length - 1
        const branch = walk(child, {...node, ...props}, acc, depth + 1, list.length - 1, lastSibling)
        if (!lastSibling)
          return branch
        // last siblings (with or without children) take id of most recent parent
        else
          return [...branch, {...props, type: 'close', id: length}]
      }, list)
    }

  }

}
