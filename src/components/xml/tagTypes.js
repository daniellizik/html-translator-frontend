import voidElements from './voidElements.json'

const ignorable = {
  ignore: ({nodeName, value, close, list}) => {
    if (close === true && voidElements.includes(nodeName))
      return false
  },
  tokens: () => null
}

const text = {
  ignore: ({nodeName, value, close}) => {
    return nodeName === '#text' 
      && !/^[\s\r\n]+$/.test(value || '') 
      && !close
  },
  tokens: ({value}) => {
    return [
      { punctuation: 'TEXT_NODE', value: value.trim() }
    ]
  }
}

const voided = {
  ignore: ({nodeName, value, list, index, close}) => {
    return voidElements.includes(nodeName)
      && !close
      && list[index + 1] 
      && list[index + 1].id === index
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
  ignore: ({nodeName, value, close}) => {
    return !close && nodeName !== '#text'
  },    
  tokens: ({nodeName, attrs}) => [
    { punctuation: 'OPEN_TAG', value: '<' },
    { punctuation: 'NODENAME', value: nodeName },
    ...attrs,
    { punctuation: 'CLOSE_TAG', value: '>' }
  ]
}

const close = {
  ignore: ({nodeName, value, close}) => {
    return voidElements.includes(nodeName) === false
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

export default {
  ignorable,
  text,
  voided,
  open,
  close
}