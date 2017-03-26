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
    // "original" slice of tree
    // start with null, we need to use full tree
    // on first search, but after that
    // the view is reduced several times by however
    // many clauses are present
    view: [],
    // mutation of view, lets us cache the view slice thing
    // when we "do work" on the view with editor
    // put it here
    mutated: []
  },

  querybuilder: {
    clauses: []
  },

  mutator: {
    clauses: []
  }

};


```