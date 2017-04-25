export default {

  error: null,

  locale: 'en-US',

  pastInit: false,

  overlay: false,

  source: {
    rawHtml: null,
    url: null,
    name: null,
    lastModified: null
  },

  user: {
    onboarding: false,
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
    mutated: [],
    view: [],
    xml: [],
    stringified: null
  },

  activeClause: null,

  clauses: []

}