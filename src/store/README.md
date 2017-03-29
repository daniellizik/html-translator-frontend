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
    // view is nested array now, each result refers to each clause
    view: [],
    // mutation of view, lets us cache the view slice thing
    // when we "do work" on the view with editor
    // put it here
    mutated: []
  },

  clauses: []

};


```