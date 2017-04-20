import voidElements from './voidElements.json'

const ignorable = {
  ignore: ({nodeName, value, close}) => {
    return (close === true && voidElements.indexOf(nodeName) > -1)
     || (nodeName === '#text' && close === true)
     || (nodeName === '#text' && /^[\s\r\n]{0,}$/.test(value || '') )
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
      { punctuation: 'TEXT_NODE', value: value.trim() }
    ]
  }
}

const voided = {
  ignore: ({nodeName, close}) => {
    return voidElements.indexOf(nodeName) > -1 && !close
  },
  tokens: ({nodeName, attrs}) => [
    { punctuation: 'OPEN_TAG', value: '<' },
    { punctuation: 'NODENAME', value: nodeName },
    { punctuation: 'SPACER', value: ' ' },
    ...attrs,
    { punctuation: 'SLASH', value: '/' },
    { punctuation: 'CLOSE_TAG', value: '>' }
  ]
}

const open = {
  ignore: ({nodeName, close}) => {
    return !close 
      && nodeName !== '#text'
      && voidElements.indexOf(nodeName) < 0
  },    
  tokens: ({nodeName, attrs}) => [
    { punctuation: 'OPEN_TAG', value: '<' },
    { punctuation: 'NODENAME', value: nodeName },
    ...attrs,
    { punctuation: 'CLOSE_TAG', value: '>' }
  ]
}

const close = {
  ignore: ({nodeName, close}) => {
    return voidElements.indexOf(nodeName) < 0
      && close === true
      && nodeName !== '#text'
  },    
  tokens: ({nodeName}) => [
    { punctuation: 'OPEN_TAG', value: '<' },
    { punctuation: 'SLASH', value: '/' },
    { punctuation: 'NODENAME', value: nodeName },
    { punctuation: 'CLOSE_TAG', value: '>' }
  ]
}

export const tokenizeAttrs = (attrs = []) => {
  return attrs.length < 1 ? [] : attrs.reduce((acc, attr) => {
    return [
      ...acc,
      { punctuation: 'SPACER', value: ' ' },
      { punctuation: 'ATTR_NAME', value: attr.name },
      { punctuation: 'ATTR_SETTER', value: '=' },
      { punctuation: 'ATTR_QUOTE_OPEN', value: '"' },
      { punctuation: 'ATTR_VALUE', value: attr.value },
      { punctuation: 'ATTR_QUOTE_CLOSE', value: '"' }
    ]
  }, [])
}

export default {
  ignorable,
  text,
  voided,
  open,
  close
}