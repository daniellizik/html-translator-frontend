export default {

  error: null,

  locale: 'en-US',

  pastInit: false,

  components: {
    querybuilder: true,
    mutator: false,
    htmlmount: false,
    htmlpreview: false
  },

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
    list: [],
    ast: [],
    rawHtml: null,
    tree: [],
    view: [],
    mutated: []
  },

  querybuilder: {
    clauses: []
  },

  mutator: {
    clauses: []
  }

}