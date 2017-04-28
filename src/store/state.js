export default {

  error: null,

  locale: 'en-US',

  pastInit: false,

  overlay: false,

  source: {
    active: false,
    rawHtml: null,
    url: null,
    name: null,
    lastModified: null
  },

  onboarding: {
    state: false,
    step: 0
  },

  user: {
    tooltips: false,
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