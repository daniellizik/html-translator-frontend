// use this to chain a crap load of stories
// mimicks what a user might do
// keep a history of state changes and run assertions on those

import * as constants from '~/src/components/clause/constants'
import state from '~/test/stateFixtures/mutate'
import * as actions from '~/src/components/clause/actions'
import reducer from '~/src/components/clause/reducer'
import { chainActions } from '~/src/util'

export const allReplaceText = chainActions(
  state,
  reducer,
  actions.activateClause(0),
  actions.addMutation(0),
  actions.mutationChangeRule('ALL_REPLACE', 0, 1),
  actions.mutationChangeRuleValue('blah', 0, 1),
  actions.activateMutation(true, 0, 1)
) 

export const reducedMutations = chainActions(
  allReplaceText,
  reducer,
  actions.addMutation(0),
  actions.mutationChangeRule('START_OF', 0, 2),
  actions.mutationChangeRuleValue('cat ', 0, 2),
  actions.activateMutation(true, 0, 2)
)