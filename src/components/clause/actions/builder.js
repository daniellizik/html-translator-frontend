import * as constants from '../constants'

export default {
  removeAll: () => ({
    type: constants.BUILDER_REMOVE_ALL_CLAUSES
  }),
  denormalizeAll: () => ({
    type: constants.BUILDER_VIEW_ALL_MUTATIONS
  }),
  hideAllMutations: () => ({
    type: constants.BUILDER_HIDE_ALL_MUTATIONS
  })
}