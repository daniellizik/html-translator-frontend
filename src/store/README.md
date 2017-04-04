```
export default {

  // global error state
  error: null,

  locale: 'en-US',

  // need this for router
  routing: {},

  pastInit: false,

  source: {
    html: '',
    url: '',
    file: null,
    lastModified: null
  },

  // if premium ever becomes a thing
  // determines feature scope
  user: {
    maxClauses: Infinity
  },

  slave: {
    hasLoaded: false,
    // wtf does this do?
    status: null,
    list: [],
    // posthtml-parser ast
    ast: [],
    // original html
    rawHtml: null,
    // original normalized dom traversal
    // comes from slave bundle
    tree: [],
    // mutation of view, lets us cache the view slice thing
    // when we "do work" on the view with editor
    // put it here
    mutated: []
  },

  clauses: [
    {
      // name of the clause
      name: 'clause #1',
      // UI state
      minimized: false,
      // UI state, also shows corresponding view in html render
      active: true,
      // queries
      queries: [
        { type: 'QUERY', targetValue: 'cat-a', target: 'TEXT', rule: 'LIKE', ruleValueFlags: '' },
      ],
      // mutations
      mutations: [
        { type: 'MUTATION', rule: 'END_OF', ruleValue: 'blah', active: true }
      ]
    }
  ]

};


```