import * as constants from '~/src/components/clause/constants'
import baseState from '~/test/stateFixtures/test'
import { queryActions, mutateActions, clauseActions, builderActions } from '~/src/components/clause/actions/index'
import reducer from '~/src/store/rootReducer'
import { chainActions } from '~/src/util'
import { chainedDenormalizations } from '~/src/test/storyFixtures/mutation'

export const removingAClause = chainActions(
  baseState,
  reducer,
  clauseActions.add(),
  clauseActions.add(),
  clauseActions.add(),
  clauseActions.add(),
  clauseActions.remove(0),
  clauseActions.remove(2),
  clauseActions.add(),
  clauseActions.add(),
  clauseActions.remove(2),
  clauseActions.remove(0),
  clauseActions.remove(0),
  clauseActions.remove(0)
)

export const renamingAClause = chainActions(
  baseState,
  reducer,
  clauseActions.add(),
  clauseActions.changeName(0, 'foobar')
)

export const viewSingleMutation = chainActions(
  chainedDenormalizations,
  reducer
)