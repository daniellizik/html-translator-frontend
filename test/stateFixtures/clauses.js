import { defaultQuery, defaultMutation, defaultClause } from '~/src/components/clause/settings/config'

export default [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
    ],
    mutations: [],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' }
    ],
    mutations: [],
    view: []
  }
]

export const basic = [
  {
    name: 'blah',
    minimized: false,
    active: true,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' }
    ],
    mutations: [],
    view: []
  }
]

export const multi = [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'LIKE' },
    ],
    mutations: [
      { ...defaultMutation, behavior: 'APPLY_TO_NODE', type: 'MUTATION', target: 'NODE_NAME', rule: 'ALL_REPLACE', ruleValue: 'blah', targetValue: '' }
    ],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'burrito', target: 'TEXT', rule: 'LIKE' },
    ],
    mutations: [],
    view: []
  }
]

export const mutation = [
  {
    name: 'blah',
    minimized: false,
    active: true,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' }
    ],
    mutations: [],
    view: []
  }
]