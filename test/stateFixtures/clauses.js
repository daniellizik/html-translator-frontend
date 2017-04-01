export default [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    rules: [
      { type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE', ruleValueFlags: '' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' },
    ],
    view: []
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    rules: [
      { type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE', ruleValueFlags: '' },
      { type: 'QUERY', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' }
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
      { type: 'QUERY', targetValue: 'cat', target: 'TEXT', rule: 'LIKE', ruleValueFlags: '' }
    ],
    view: []
  }
]