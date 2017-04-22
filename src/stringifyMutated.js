export default function(xml) {
  return xml.reduce((acc, {node, row, tokens}) => {
    const depth = new Array(node.depth).fill('  ').join('')
    const line = tokens.map(t => t.value).join('')
    return [...acc, depth + line]
  }, []).join('\n')
}