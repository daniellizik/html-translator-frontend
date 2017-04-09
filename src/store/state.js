export default {

  error: null,

  locale: 'en-US',

  pastInit: false,

  source: {
    visible: false,
    rawHtml: null,
    url: null,
    name: null,
    lastModified: null
  },

  user: {
    maxClauses: Infinity
  },

  slave: {
    hasLoaded: false,
    status: null,
    list: {
      open: [],
      close: []
    },
    ast: [],
    rawHtml: null,
    tree: [],
    currentMutation: -1,
    mutated: []
  },

  activeClause: null,

  clauses: []

}