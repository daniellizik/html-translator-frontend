export const QUERY = {
  targets: {
    NODE_NAME: {
      rules: ['EQUALS','NOT_EQUALS','LIKE','NOT_LIKE']
    },
    TEXT: {
      rules: ['EQUALS','NOT_EQUALS','LIKE','NOT_LIKE','REGEX']
    },
    ATTR_KEY: {
      rules: ['EQUALS','NOT_EQUALS','LIKE','NOT_LIKE','REGEX']
    },
    ATTR_VAL: {
      rules: ['EQUALS','NOT_EQUALS','LIKE','NOT_LIKE','REGEX']
    }
  }
}

export const MUTATION = {
  targets: {
    NODE_NAME: {
      rules: ['ALL_REPLACE', 'START_OF','END_OF']
    },
    TEXT: {
      rules: ['ALL_REPLACE', 'START_OF', 'END_OF', 'REGEX_REPLACE']
    },
    ATTR_KEY: {
      rules: ['ALL_REPLACE', 'START_OF', 'END_OF', 'REGEX_REPLACE']
    },
    ATTR_VAL: {
      rules: ['ALL_REPLACE', 'START_OF', 'END_OF', 'REGEX_REPLACE']
    }
  }
}

// hardcoded for parse5 ast spec
export const targetMap = {
  TEXT: 'value',
  NODE_NAME: 'nodeName'
}

export const defaultQuery = {
  target: 'TEXT',
  targetValue: '',
  rule: 'EQUALS',
  ruleValue: '',
  ruleValueFlags: ''
}

export const defaultMutation = {
  target: 'TEXT',
  targetValue: '',
  rule: 'START_OF',
  ruleValue: '',
  ruleValueFlags: ''
}

export const defaultClause = {
  name: '',
  minimized: false,
  active: false,
  queries: [defaultQuery],
  mutations: [],
  view: []
}