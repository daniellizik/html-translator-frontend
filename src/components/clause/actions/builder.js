import * as constants from '../constants'

export default {
  removeAll: () => ({
    type: constants.BUILDER_REMOVE_ALL_CLAUSES
  }),
  viewAllMutations: () => ({
    type: constants.BUILDER_VIEW_ALL_MUTATIONS
  })
}