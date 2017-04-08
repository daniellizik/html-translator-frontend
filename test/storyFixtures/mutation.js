// use this to chain a crap load of stories
// mimicks what a user might do
// keep a history of state changes and run assertions on those

import * as constants from '~/src/components/clause/constants'
import state from '~/test/stateFixtures/mutate'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'
import reducer from '~/src/components/clause/reducer'
import { chainActions } from '~/src/util'

export const allReplaceText = chainActions(
  state,
  reducer,
  clauseActions.activate(0),
  mutateActions.add(0),
  mutateActions.changeRule('ALL_REPLACE', 0, 0),
  mutateActions.changeRuleValue('blah', 0, 0),
  mutateActions.activate(true, 0, 0)
) 

export const reducedMutations = chainActions(
  allReplaceText,
  reducer,
  mutateActions.add(0),
  mutateActions.changeRule('START_OF', 0, 1),
  mutateActions.changeRuleValue('cat ', 0, 1),
  mutateActions.activate(true, 0, 1)
)

export const regexMutation = chainActions(
  reducedMutations,
  reducer,
  mutateActions.remove(0, 1),
  mutateActions.changeRule('REPLACE_REGEX', 0, 0),
  mutateActions.changeRuleValue('cat', 0, 0),
  mutateActions.changeRuleValueFlags('i', 0, 0),
  mutateActions.changeTargetValue('peanuts', 0, 0),
  mutateActions.activate(true, 0, 0)
)
