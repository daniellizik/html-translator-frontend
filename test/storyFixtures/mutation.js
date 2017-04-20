import * as constants from '~/src/components/clause/constants'
import baseState from '~/test/stateFixtures/mutate'
import { queryActions, mutateActions, clauseActions, builderActions } from '~/src/components/clause/actions/index'
import reducer from '~/src/store/rootReducer'
import { chainActions } from '~/src/util'

export const allReplaceText = chainActions(
  baseState,
  reducer,
  mutateActions.add(0),
  mutateActions.changeRule('ALL_REPLACE', 0, 0),
  clauseActions.changeTarget('TEXT', 0),
  mutateActions.changeRuleValue('blah', 0, 0),
  mutateActions.toggle(true, 0, 0)
) 

export const reducedMutations = chainActions(
  allReplaceText,
  reducer,
  mutateActions.add(0),
  clauseActions.changeTarget('TEXT', 0, 1),
  mutateActions.changeRule('ALL_REPLACE', 0),
  mutateActions.changeRuleValue('cat ', 0, 1),
  clauseActions.denormalize(0)
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
  clauseActions.denormalize(0),
  mutateActions.add(0),
  mutateActions.changeRule('REGEX_REPLACE', 0, 1),
  mutateActions.changeRuleValue('eanu', 0, 1),
  mutateActions.changeTargetValue(' foobar ', 0, 1),
  mutateActions.toggle(true, 0, 1),
  clauseActions.denormalize(0),
  mutateActions.changeRuleValueFlags('[mutate!!]', 0, 0),
  clauseActions.denormalize(0)
)

export const toggling = chainActions(
  regexMutation,
  reducer,
  clauseActions.viewMutations(0),
  clauseActions.viewMutations(-1),
  clauseActions.viewMutations(1)
)

export const nodename = chainActions(
  toggling,
  reducer,
  mutateActions.remove(0, 1),
  mutateActions.remove(0, 0),
  mutateActions.add(0),
  queryActions.changeRule('LIKE', 0, 0),
  queryActions.changeTargetValue('span', 0, 0),
  clauseActions.changeTarget('NODE_NAME', 0),
  clauseActions.viewMutations(0),
  mutateActions.changeRule('ALL_REPLACE', 0, 0),
  mutateActions.changeRuleValue('h13', 0, 0),
  mutateActions.toggle(true, 0, 0),
  clauseActions.denormalize(0)
)

export const chainedDenormalizations = chainActions(
  nodename,
  reducer,
  clauseActions.changeTarget('TEXT', 0),
  queryActions.changeTargetValue('cat-', 0, 0),
  mutateActions.add(0),
  mutateActions.changeRuleValue('blah', 0, 0),
  mutateActions.changeRuleValue('-foo', 0, 1),
  mutateActions.changeRule('END_OF', 0, 1),
  clauseActions.add(),
  clauseActions.changeTarget('NODE_NAME', 1),
  queryActions.changeTargetValue('span', 1, 0),
  mutateActions.add(1),
  mutateActions.changeRuleValue('span-good', 1, 0),
  mutateActions.changeRule('ALL_REPLACE', 1, 0),
  builderActions.denormalizeAll()
) 