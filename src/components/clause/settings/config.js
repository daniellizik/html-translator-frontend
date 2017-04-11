export const targets = ['NODE_NAME', 'TEXT', 'ATTR_KEY', 'ATTR_VAL']
export const behaviors = ['APPLY_TO_CHILDREN', 'APPLY_TO_NODE']

export const QUERY = {
  targets: {
    NODE_NAME: {
      rules: [
        'EQUALS', 
        'NOT_EQUALS', 
        'LIKE', 
        'NOT_LIKE',
        'REGEX'
      ],
      behaviors: []
    },
    TEXT: {
      rules: [
        'EQUALS', 
        'NOT_EQUALS', 
        'LIKE', 
        'NOT_LIKE',
        'REGEX'
      ],
      behaviors: []
    },
    ATTR_KEY: {
      rules: [
        'EQUALS', 
        'NOT_EQUALS', 
        'LIKE', 
        'NOT_LIKE',
        'REGEX',
        'HAS_NONE',
        'HAS_AT_LEAST'
      ],
      behaviors: []
    },
    ATTR_VAL: {
      rules: [
        'EQUALS', 
        'NOT_EQUALS', 
        'LIKE', 
        'NOT_LIKE',
        'REGEX'
      ],
      behaviors: []
    }
  }
}

export const MUTATION = {
  targets: {
    NODE_NAME: {
      rules: ['ALL_REPLACE', 'START_OF','END_OF'],
      behaviors
    },
    TEXT: {
      rules: ['ALL_REPLACE', 'START_OF', 'END_OF', 'REGEX_REPLACE'],
      behaviors
    },
    ATTR_KEY: {
      rules: ['ALL_REPLACE', 'START_OF', 'END_OF', 'REGEX_REPLACE'],
      behaviors
    },
    ATTR_VAL: {
      rules: ['ALL_REPLACE', 'START_OF', 'END_OF', 'REGEX_REPLACE'],
      behaviors
    }
  }
}

// hardcoded for parse5 ast spec
export const targetMap = {
  TEXT: 'value',
  NODE_NAME: 'nodeName'
}

export const defaultQuery = {
  targetValue: '',
  rule: 'EQUALS',
  ruleValue: '',
  ruleValueFlags: ''
}

export const defaultMutation = {
  targetValue: '',
  rule: 'START_OF',
  ruleValue: '',
  ruleValueFlags: '',
  behavior: ''
}

export const defaultClause = {
  name: '',
  minimized: false,
  active: false,
  target: 'TEXT',
  type: 'CLAUSE',
  queries: [defaultQuery],
  mutations: [],
  view: []
}