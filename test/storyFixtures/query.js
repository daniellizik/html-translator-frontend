// use this to chain a crap load of stories
// mimicks what a user might do
// keep a history of state changes and run assertions on those

import * as constants from '~/src/components/clause/constants'
import state from '~/test/stateFixtures/test'
import * as actions from '~/src/components/clause/actions'
import reducer from '~/src/components/clause/reducer'
import { chainActions } from '~/src/util'

export default chainActions(
  state,
  reducer,
  actions.addClause(),
  actions.addClause(),
  actions.addClause(),
  actions.removeClause(2),
  actions.addQuery(0),
  actions.addQuery(0),
  actions.addQuery(0),
  actions.addQuery(0),
  actions.removeQuery(0, 4),
  actions.removeQuery(0, 3),
  actions.removeQuery(0, 2),
  actions.removeQuery(0, 1),
  actions.changeRule('LIKE', 0, 0),
  actions.changeTargetValue('cat-', 0, 0), // 14
  actions.addQuery(0),
  actions.changeRule('LIKE', 0, 1),
  actions.changeTargetValue('-a', 0, 1),
  actions.changeRule('LIKE', 1, 0),
  actions.changeTargetValue('burrito', 1, 0),
  actions.changeRule('EQUALS', 0, 1),
  actions.changeTargetValue('cat-a', 0, 1), // 21
  actions.changeRule('EQUALS', 1, 0),
  actions.changeTargetValue('cat burrito cheese', 1, 0),
  actions.changeRule('NOT_EQUALS', 0, 0),
  actions.changeTargetValue('cat-a', 0, 0),
  actions.changeRule('NOT_EQUALS', 0, 1),
  actions.changeTargetValue('cat burrito cheese', 0, 1), // 27
  actions.changeRule('NOT_LIKE', 0, 0),
  actions.changeTargetValue('cat', 0, 0),
  actions.changeRule('NOT_LIKE', 0, 1),
  actions.changeTargetValue('burrito', 0, 1),
  actions.changeRule('REGEX', 0, 0),
  actions.changeRuleValue('cat', 0, 0),
  actions.changeRule('REGEX', 0, 1),
  actions.changeRuleValue('fajita', 0, 1),
  actions.changeTarget('NODE_NAME', 1, 0),
  actions.changeTargetValue('span', 1, 0),
  actions.changeTarget('ATTR_KEY', 1, 0),
  actions.changeRule('EQUALS', 1, 0),
  actions.changeTargetValue('data-cat', 1, 0),
  actions.changeTargetValue('q', 1, 0),
  actions.changeRule('LIKE', 1, 0),
  actions.changeTargetValue('cat', 1, 0),
  actions.addQuery(1),
  actions.changeRule('LIKE', 1, 1),
  actions.changeTarget('ATTR_KEY', 1, 1),
  actions.changeTargetValue('data', 1, 1),
  actions.changeRule('NOT_LIKE', 1, 0),
  actions.removeQuery(1, 1),
  actions.changeRule('NOT_EQUALS', 1, 0),
  actions.changeTargetValue('data-cat', 1, 0),
  actions.changeTarget('ATTR_VAL', 1, 0),
  actions.changeTargetValue('something', 1, 0),
  actions.changeRule('EQUALS', 1, 0),
  actions.changeTargetValue('some', 1, 0),
  actions.changeRule('LIKE', 1, 0),
  actions.changeRule('NOT_LIKE', 1, 0),
  actions.changeRule('NOT_EQUALS', 1, 0),
  actions.changeRule('REGEX', 1, 0),
  actions.changeRuleValue('some', 1, 0)
)