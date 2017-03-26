export default [

  [
    { targetValue: 'cat-a', target: 'text', rule: 'like', ruleValueFlags: '' },
    { targetValue: 'div', target: 'nodeName', rule: 'equals', ruleValueFlags: '' }
  ],

  [
    { targetValue: 'cat', target: 'text', rule: 'like', ruleValueFlags: '' },
    { targetValue: '-a', target: 'text', rule: 'like', ruleValueFlags: '' }
  ],

  [
    { targetValue: 'cat-a', target: 'text', rule: 'equals', ruleValueFlags: '' }
  ],

  [
    { targetValue: 'cat', target: 'text', rule: 'regex', ruleValueFlags: 'i' }
  ],

  [
    { targetValue: 'cat', target: 'text', rule: 'notEquals', ruleValueFlags: '' }
  ]

]