// use this to chain a crap load of stories
// mimicks what a user might do
// keep a history of state changes and run assertions on those

import * as constants from '~/src/components/clause/constants'
import baseState from '~/test/stateFixtures/mutate'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'
import reducer from '~/src/components/clause/reducers/reducer'
import { chainActions } from '~/src/util'

export const allReplaceText = chainActions(
  baseState,
  reducer,
  clauseActions.activate(0),
  mutateActions.add(0),
  mutateActions.changeRule('ALL_REPLACE', 0, 0),
  mutateActions.changeRuleValue('blah', 0, 0),
  mutateActions.toggle(true, 0, 0)
) 

export const reducedMutations = chainActions(
  allReplaceText,
  reducer,
  mutateActions.add(0),
  mutateActions.changeRule('START_OF', 0, 1),
  mutateActions.changeRuleValue('cat ', 0, 1),
  mutateActions.toggle(true, 0, 1)
)

export const regexMutation = chainActions(
  reducedMutations,
  reducer,
  mutateActions.remove(0, 1),
  mutateActions.changeRule('REGEX_REPLACE', 0, 0),
  mutateActions.changeRuleValue('cat', 0, 0),
  mutateActions.changeRuleValueFlags('i', 0, 0),
  mutateActions.changeTargetValue('peanuts', 0, 0),
  mutateActions.toggle(true, 0, 0),
  mutateActions.denormalize(0),
  mutateActions.add(0),
  mutateActions.changeRule('REGEX_REPLACE', 0, 1),
  mutateActions.changeRuleValue('eanu', 0, 1),
  mutateActions.changeTargetValue(' foobar ', 0, 1),
  mutateActions.toggle(true, 0, 1),
  mutateActions.denormalize(0),
)

export const toggling = chainActions(
  regexMutation,
  reducer,
  clauseActions.setCurrentMutation(0),
  clauseActions.setCurrentMutation(-1),
  clauseActions.setCurrentMutation(1)
)

export const nodename = chainActions(
  toggling,
  reducer,
  mutateActions.remove(0, 1),
  mutateActions.remove(0, 0),
  mutateActions.add(0),
  queryActions.changeRule('LIKE', 0, 0),
  queryActions.changeTargetValue('span', 0, 0),
  queryActions.changeTarget('NODE_NAME', 0, 0),
  clauseActions.setCurrentMutation(0),
  mutateActions.changeRule('ALL_REPLACE', 0, 0),
  mutateActions.changeRuleValue('h13', 0, 0),
  mutateActions.toggle(true, 0, 0),
  mutateActions.denormalize(0)
)