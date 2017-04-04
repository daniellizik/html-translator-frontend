export default [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    rules: [
      { type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' },
    ],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    rules: [
      { type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS' }
    ],
    view: []
  }
]

export const basic = [
  {
    name: 'blah',
    minimized: false,
    active: true,
    rules: [
      { type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' }
    ],
    view: []
  }
]

export const multi = [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    rules: [
      { type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' },
    ],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    rules: [
      { type: 'QUERY', targetValue: 'burrito', target: 'TEXT', rule: 'LIKE' },
    ],
    view: []
  }
]

export const mutation = [
  {
    name: 'blah',
    minimized: false,
    active: true,
    rules: [
      { type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE' }
    ],
    view: []
  }
]