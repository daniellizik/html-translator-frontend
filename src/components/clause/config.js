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
    '*': {
      rules: ['ALL_REPLACE', 'START_OF','END_OF','REGEX_REPLACE']
    }
  }
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