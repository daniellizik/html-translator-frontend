export default [
  {
    name: 'clause #1',
    minimized: false,
    active: true,
    rules: [
      { type: 'query', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE', ruleValueFlags: '' },
      { type: 'query', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' },
      { type: 'query', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' },
      { type: 'query', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' },
    ]
  },
  {
    name: 'clause #2',
    minimized: true,
    active: false,
    rules: [
      { type: 'query', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE', ruleValueFlags: '' },
      { type: 'query', targetValue: 'div', target: 'NODE_NAME', rule: 'EQUALS', ruleValueFlags: '' }
    ]
  }
]