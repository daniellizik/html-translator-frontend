import * as constants from '~/src/components/clause/constants'
import baseState from '~/test/stateFixtures/test'
import { queryActions, mutateActions, clauseActions, builderActions } from '~/src/components/clause/actions/index'
import reducer from '~/src/store/rootReducer'
import { chainActions } from '~/src/util'

export const viewingAllMutations = chainActions(
  baseState,
  reducer
)