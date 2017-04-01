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
      rules: ['ALL_REPLACE']
    },
    TEXT: {
      rules: ['START_OF','END_OF','ALL_REPLACE','REGEX_REPLACE']
    },
    ATTR_KEY: {
      rules: ['START_OF','END_OF','REGEX_REPLACE','ALL_REPLACE','CONCAT']
    },
    ATTR_VAL: {
      rules: ['START_OF','END_OF','REGEX_REPLACE','ALL_REPLACE','CONCAT']
    }
  }
}

export const defaultQuery = {
  type: 'QUERY',
  target: 'TEXT',
  targetValue: '',
  rule: 'EQUALS',
  ruleValue: '',
  ruleValueFlags: ''
}

export const defaultMutation = {
  type: 'MUTATION',
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
  rules: [defaultQuery],
  view: []
}