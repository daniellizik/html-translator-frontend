// use this to chain a crap load of stories
// mimicks what a user might do
// keep a history of state changes and run assertions on those

import * as constants from '~/src/components/clause/constants'
import state from '~/test/stateFixtures/test'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'
import reducer from '~/src/store/rootReducer'
import { chainActions } from '~/src/util'

export const addingAClause = chainActions(
  state,
  reducer,
  clauseActions.add(),
  clauseActions.add(),
  clauseActions.add()
)

export const removingAClause = chainActions(
  addingAClause,
  reducer,
  clauseActions.remove(2)
)

export const addingAQuery = chainActions(
  removingAClause,
  reducer,
  queryActions.add(0),
  queryActions.add(0),
  queryActions.add(0),
  queryActions.add(0)
)

export const removingAQuery = chainActions(
  addingAQuery,
  reducer,
  queryActions.remove(0, 4),
  queryActions.remove(0, 3),
  queryActions.remove(0, 2),
  queryActions.remove(0, 1)
)

export const modifyingTextQueries = chainActions(
  removingAQuery,
  reducer,
  queryActions.changeRule('LIKE', 0, 0),
  queryActions.changeTargetValue('cat-', 0, 0), 
  queryActions.add(0),
  queryActions.changeRule('LIKE', 0, 1),
  queryActions.changeTargetValue('-a', 0, 1),
  queryActions.changeRule('LIKE', 1, 0),
  queryActions.changeTargetValue('burrito', 1, 0),
  queryActions.changeRule('EQUALS', 0, 1),
  queryActions.changeTargetValue('cat-a', 0, 1), 
  queryActions.changeRule('EQUALS', 1, 0),
  queryActions.changeTargetValue('cat burrito cheese', 1, 0),
  queryActions.changeRule('NOT_EQUALS', 0, 0),
  queryActions.changeTargetValue('cat-a', 0, 0),
  queryActions.changeRule('NOT_EQUALS', 0, 1),
  queryActions.changeTargetValue('cat burrito cheese', 0, 1), 
  queryActions.changeRule('NOT_LIKE', 0, 0),
  queryActions.changeTargetValue('cat', 0, 0),
  queryActions.changeRule('NOT_LIKE', 0, 1),
  queryActions.changeTargetValue('burrito', 0, 1),
  queryActions.changeRule('REGEX', 0, 0),
  queryActions.changeRuleValue('cat', 0, 0),
  queryActions.changeRule('REGEX', 0, 1),
  queryActions.changeRuleValue('fajita', 0, 1) 
)

export const modifyingNodeNameQueries = chainActions(
  modifyingTextQueries,
  reducer,
  clauseActions.changeTarget('NODE_NAME', 1, 0),
  queryActions.changeTargetValue('span', 1, 0)
)

export const modifyingAttrKeyQueries = chainActions(
  modifyingNodeNameQueries,
  reducer,
  clauseActions.changeTarget('ATTR_KEY', 1),
  queryActions.changeRule('EQUALS', 1, 0),
  queryActions.changeTargetValue('data-cat', 1, 0),
  queryActions.changeTargetValue('q', 1, 0),
  queryActions.changeRule('LIKE', 1, 0),
  queryActions.changeTargetValue('cat', 1, 0),
  queryActions.add(1),
  queryActions.changeRule('LIKE', 1, 1),
  clauseActions.changeTarget('ATTR_KEY', 1),
  queryActions.changeTargetValue('data', 1, 1),
  queryActions.changeRule('NOT_LIKE', 1, 0),
  queryActions.remove(1, 1),
  queryActions.changeRule('NOT_EQUALS', 1, 0),
  queryActions.changeTargetValue('data-cat', 1, 0)
)

export const modifyingAttrValQueries = chainActions(
  modifyingNodeNameQueries,
  reducer,
  clauseActions.changeTarget('ATTR_VAL', 1),
  queryActions.changeTargetValue('something', 1, 0),
  queryActions.changeRule('EQUALS', 1, 0),
  queryActions.changeTargetValue('some', 1, 0),
  queryActions.changeRule('LIKE', 1, 0),
  queryActions.changeRule('NOT_LIKE', 1, 0),
  queryActions.changeRule('NOT_EQUALS', 1, 0),
  queryActions.changeRule('REGEX', 1, 0),
  queryActions.changeRuleValue('some', 1, 0)
)

export const searchNodeNameViaRx = chainActions(
  state,
  reducer,
  clauseActions.add(),
  clauseActions.changeTarget('NODE_NAME', 0),
  queryActions.remove(0, 0),
  queryActions.add(0),
  queryActions.changeRule('REGEX', 0, 0),
  queryActions.changeRuleValue('spa', 0, 0),
  queryActions.changeRuleValueFlags('i', 0, 0),
  queryActions.changeRuleValueFlags('!#$#%%%#', 0, 0)
)