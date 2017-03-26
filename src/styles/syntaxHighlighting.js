import * as constants from './constants'

const colors = constants.syntaxHighlighting

const defaults = {

}

// these are all svg, so you can't use color
// and whatever...

export default {

  OPEN_TAG: (props) => ({
    ...defaults,
    color: colors.punctuation
  }),

  NODENAME: (props) => ({
    ...defaults,
    color: colors.node_name
  }),

  SLASH: (props) => ({
    ...defaults,
    color: colors.punctuation
  }),

  CLOSE_TAG: (props) => ({
    ...defaults,
    color: colors.punctuation
  }),

  TEXT_NODE: (props) => ({
    ...defaults,
    // color: 'black'
  }),

  SPACER: (props) => ({
    ...defaults
  }),

  ATTR_NAME: (props) => ({
    ...defaults,
    color: colors.attr
  }),

  ATTR_VALUE: (props) => ({
    ...defaults,
    color: colors.attr
  }),

  ATTR_SETTER: (props) => ({
    ...defaults,
    color: colors.attr
  }),

  ATTR_QUOTE_OPEN: (props) => ({
    ...defaults,
    color: colors.attr
  }),

  ATTR_QUOTE_CLOSE: (props) => ({
    ...defaults,
    color: colors.attr
  })


}
