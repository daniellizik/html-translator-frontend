import state from '~/src/store/state'
import reducer from '~/src/store/rootReducer'
import { chainActions, makeStoryTree } from '~/src/util'
import * as onboarderActions from '~/src/containers/onboarder/actions'
import { clauseActions, queryActions, mutateActions, 
  builderActions } from '~/src/components/clause/actions/index'
import { actions as navActions } from '~/src/components/navigator'
import * as sourceSetterActions from '~/src/containers/sourceSetter/actions'
import rawHtml from '~/test/htmlFixtures/sample-email.html'

export const story = chainActions(
  {...state, onboarding:{step:0}, overlay: true},
  reducer,
  onboarderActions.onboardInit(),
  navActions.callSourceSetter(),
  sourceSetterActions.htmlReceived(rawHtml),
  clauseActions.add(),
  onboarderActions.step_4(),
  queryActions.add(0),
  // 7
  onboarderActions.step_6(),
  clauseActions.changeTarget('NODE_NAME', 0),
  queryActions.changeTargetValue('tr', 0, 0),
  mutateActions.add(0),
  onboarderActions.step_9(),
  // 12
  mutateActions.changeRuleValue('a', 0, 0),
  mutateActions.changeRuleValue('ab', 0, 0),
  mutateActions.changeRuleValue('abc', 0, 0),
  mutateActions.changeRuleValue('abcd', 0, 0),
  // 16
  clauseActions.denormalize(0),
  clauseActions.add(),
  queryActions.changeTargetValue('forward to', 1, 0),
  queryActions.changeRule('LIKE', 1, 0),
  mutateActions.changeRuleValue('cat', 1, 0),
  mutateActions.changeRule('END_OF', 1, 0)
)

export const step7regression = chainActions(
  story[7],
  reducer,
  queryActions.changeTarget('TEXT', 0, 0),
  queryActions.changeTargetValue('email template', 0, 0),
  queryActions.changeRule('LIKE', 0, 0)
)

export const regression = chainActions(
  story[9],
  reducer,
  navActions.callSourceSetter(),
  () => story[14],
  mutateActions.remove(0, 0),
  queryActions.remove(0, 0),
  mutateActions.add(0),
  queryActions.add(0),
  queryActions.changeTargetValue('kfljads', 0, 0),
  () => story[16],
  // 9
  builderActions.removeAll(),
  builderActions.denormalizeAll(),
  mutateActions.remove(0, 0),
  queryActions.remove(0, 0),
  mutateActions.add(0),
  queryActions.add(0),
  queryActions.changeTargetValue('kfljads', 0, 0)
)