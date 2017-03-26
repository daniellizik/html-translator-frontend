import voidElements from './voidElements.json'

const emptyRx = /^[\s\r\n]+$/

export function tokenizeAttrs(attrs = []) {
  return attrs.length < 1 ? [] : attrs.reduce((acc, attr) => {
    return [
      ...acc,
      { punctuation: 'SPACER', content: ' ' },
      { punctuation: 'ATTR_NAME', content: attr.name },
      { punctuation: 'ATTR_SETTER', content: '=' },
      { punctuation: 'ATTR_QUOTE_OPEN', content: '"' },
      { punctuation: 'ATTR_VALUE', content: attr.value },
      { punctuation: 'ATTR_QUOTE_CLOSE', content: '"' }
    ]
  }, [])
}

export default function(acc, node, i, list, reducedAttrs) {
  const { nodeName, type } = node
  const text = node.value || ' '
  const hasVoid = voidElements.includes(nodeName)
  const isClosing = node.type === 'open' && list[i + 1] && list[i + 1].id === i
  return [
    // text tags
    {
      canRender: nodeName === '#text' && !emptyRx.test(text) && type !== 'close',
      tokens: [
        { punctuation: 'TEXT_NODE', content: (text).trim() }
      ],
    },
    // void, self-closing tags
    {
      canRender: hasVoid && isClosing,
      tokens: [
        { punctuation: 'OPEN_TAG', content: '<' },
        { punctuation: 'NODENAME', content: node.nodeName },
        { punctuation: 'SPACER', content: ' ' },
        { punctuation: 'SLASH', content: '/' },
        ...reducedAttrs,
        { punctuation: 'CLOSE_TAG', content: '>' }
      ]
    },
    // open tags excluding #text
    {
      canRender: ['root', 'open'].indexOf(type) > -1 && nodeName !== '#text',
      tokens: [
        { punctuation: 'OPEN_TAG', content: '<' },
        { punctuation: 'NODENAME', content: node.nodeName },
        ...reducedAttrs,
        { punctuation: 'CLOSE_TAG', content: '>' }
      ]
    },
    // closing tags excluding #text
    {
      canRender: !hasVoid && type === 'close' && nodeName !== '#text',
      tokens: [
        { punctuation: 'OPEN_TAG', content: '<' },
        { punctuation: 'SLASH', content: '/' },
        { punctuation: 'NODENAME', content: node.nodeName },
        { punctuation: 'CLOSE_TAG', content: '>' }
      ]
    }
  ]
}
