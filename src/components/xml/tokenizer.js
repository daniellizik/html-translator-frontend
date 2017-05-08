import voidElements from './voidElements.json'

const ignorable = {
  ignore: ({nodeName, value, close}) => {
    return (close === true && voidElements.indexOf(nodeName) > -1)
     || (nodeName === '#text' && close === true)
     || (nodeName === '#text' && /^[\s\r\n]{0,}$/.test(value || '') )
     || (nodeName === '#comment' && close)
  },
  tokens: () => null
}

const text = {
  ignore: ({nodeName, value, close}) => {
    return nodeName === '#text' 
      && !/^[\s\r\n]{0,}$/.test(value || '') 
      && !close
  },
  tokens: ({value}) => {
    return [
      { type: 'TEXT_NODE', value: value.trim() }
    ]
  }
}

const comment = {
  ignore: ({nodeName, value, close}) => {
    return nodeName === '#comment' && !close
  },
  tokens: ({value}) => {
    return [
      { type: 'COMMENT_OPEN', value: '<!-- ' },
      { type: 'COMMENT_VALUE', value },
      { type: 'COMMENT_CLOSE', value: ' -->' }
    ]
  }
}

const voided = {
  ignore: ({nodeName, close}) => {
    return voidElements.indexOf(nodeName) > -1 && !close
  },
  tokens: ({nodeName, attrs}) => [
    { type: 'OPEN_TAG', value: '<' },
    { type: 'NODENAME', value: nodeName },
    { type: 'SPACER', value: ' ' },
    ...attrs,
    { type: 'SLASH', value: '/' },
    { type: 'CLOSE_TAG', value: '>' }
  ]
}

const open = {
  ignore: ({nodeName, close}) => {
    return !close 
      && nodeName !== '#text'
      && voidElements.indexOf(nodeName) < 0
  },    
  tokens: ({nodeName, attrs}) => [
    { type: 'OPEN_TAG', value: '<' },
    { type: 'NODENAME', value: nodeName },
    ...attrs,
    { type: 'CLOSE_TAG', value: '>' }
  ]
}

const close = {
  ignore: ({nodeName, close}) => {
    return voidElements.indexOf(nodeName) < 0
      && close === true
      && nodeName !== '#text'
  },    
  tokens: ({nodeName}) => [
    { type: 'OPEN_TAG', value: '<' },
    { type: 'SLASH', value: '/' },
    { type: 'NODENAME', value: nodeName },
    { type: 'CLOSE_TAG', value: '>' }
  ]
}

export const tokenizeAttrs = (attrs = []) => {
  return attrs.length < 1 ? [] : attrs.reduce((acc, attr) => {
    return [
      ...acc,
      { type: 'SPACER', value: ' ' },
      { type: 'ATTR_NAME', value: attr.name },
      { type: 'ATTR_SETTER', value: '=' },
      { type: 'ATTR_QUOTE_OPEN', value: '"' },
      { type: 'ATTR_VALUE', value: attr.value },
      { type: 'ATTR_QUOTE_CLOSE', value: '"' }
    ]
  }, [])
}

export default {
  ignorable,
  text,
  comment,
  voided,
  open,
  close
}