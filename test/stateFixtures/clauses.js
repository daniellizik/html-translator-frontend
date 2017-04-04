export default [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    queries: [
      { type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
    ],
    mutations: [],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    queries: [
      { type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' }
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
      { type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' }
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
      { type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' },
    ],
    mutations: [
      { type: 'MUTATION', rule: 'ALL_REPLACE', ruleValue: 'blah' }
    ],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    queries: [
      { type: 'QUERY', targetValue: 'burrito', target: 'TEXT', rule: 'LIKE' },
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
      { type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' }
    ],
    mutations: [],
    view: []
  }
]