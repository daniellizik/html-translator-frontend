import { defaultQuery, defaultMutation } from '~/src/components/clause/settings/config'

export default [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    target: 'TEXT',
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat-a', rule: 'LIKE' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', rule: 'EQUALS' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', rule: 'EQUALS' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', rule: 'EQUALS' },
    ],
    mutations: [],
    view: []
  },
  {
    name: 'clause #2',
    target: 'TEXT',
    minimized: true,
    active: false,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat-a', rule: 'LIKE' },
      { ...defaultQuery, type: 'QUERY', targetValue: 'div', rule: 'EQUALS' }
    ],
    mutations: [],
    view: []
  }
]

export const basic = [
  {
    name: 'blah',
    minimized: false,
    target: 'TEXT',
    active: true,
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat', rule: 'LIKE' }
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
    target: 'TEXT',
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat', rule: 'LIKE' },
    ],
    mutations: [
      { ...defaultMutation, type: 'MUTATION', rule: 'ALL_REPLACE', ruleValue: 'blah', targetValue: '' },
      { ...defaultMutation, type: 'MUTATION', rule: 'END_OF', ruleValue: ' jesuf', targetValue: '' },
    ],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    target: 'NODE_NAME',
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'span', rule: 'EQUALS' },
    ],
    mutations: [
      { ...defaultMutation, type: 'MUTATION', rule: 'ALL_REPLACE', ruleValue: 'span-blah' }
    ],
    view: []
  }
]

export const mutation = [
  {
    name: 'blah',
    minimized: false,
    active: true,
    target: 'TEXT',
    queries: [
      { ...defaultQuery, type: 'QUERY', targetValue: 'cat', rule: 'LIKE' }
    ],
    mutations: [],
    view: []
  }
]