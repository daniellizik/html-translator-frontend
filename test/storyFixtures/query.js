// use this to chain a crap load of stories
// mimicks what a user might do
// keep a history of state changes and run assertions on those

import * as constants from '~/src/components/clause/constants'
import state from '~/test/stateFixtures/test'
import * as actions from '~/src/components/clause/actions'
import reducer from '~/src/components/clause/reducer'
import config from '~/src/components/clause/config'
import queryclauses from '~/test/stateFixtures/queryclauses'
import { chainActions } from '~/src/util'

const baseState = {...state, querybuilder: {clauses: []}}

const addAndEditClause = ({index, target, rule, targetValue}) => ([
  actions.addClause('querybuilder'),
  actions.changeTarget('querybuilder', target, index),
  actions.changeRule('querybuilder', rule, index),
  actions.changeTargetValue('querybuilder', targetValue, index)
])

// 0 no clauses at start
const chained = [
  // 1
  actions.addClause('querybuilder'),
  actions.changeTarget('querybuilder', 'text', 1),
  actions.changeRule('querybuilder', 'regex', 1),
  actions.changeTargetValue('querybuilder', 'fklsjdf', 1),
  // 5
  actions.removeClause('querybuilder', 0),
  actions.removeClause('querybuilder', 0),
  actions.addClause('querybuilder'),
  actions.changeTarget('querybuilder', 'attrKey', 0),
  actions.changeRule('querybuilder', 'regex', 0),
  // 10
  actions.changeRuleValue('querybuilder', 'cat', 0),
  actions.changeRuleValueFlags('querybuilder', 'i', 0),
  actions.changeTarget('querybuilder', 'attrVal', 0),
  // 13
  actions.changeRuleValue('querybuilder', 'burrito', 0),
  actions.removeClause('querybuilder', 0),
  // 15
  actions.addClause('querybuilder'),
  actions.changeTarget('querybuilder', 'text', 0),
  actions.changeRule('querybuilder', 'equals', 0),
  // 18
  actions.changeTargetValue('querybuilder', 'cat burrito bacon', 0),
  actions.changeTarget('querybuilder', 'attrKey', 0),
  actions.changeTargetValue('querybuilder', 'data-cat', 0),
  // 21
  actions.changeTarget('querybuilder', 'attrVal', 0),
  actions.changeTargetValue('querybuilder', 'burrito', 0),
  actions.changeTarget('querybuilder', 'nodeName', 0),
  actions.changeTargetValue('querybuilder', 'span', 0),
  actions.removeClause('querybuilder', 0),
  // 26, not equals
  actions.addClause('querybuilder'),
  actions.changeTarget('querybuilder', 'text', 0),
  actions.changeRule('querybuilder', 'notEquals', 0),
  actions.changeTargetValue('querybuilder', 'cat', 0),
  actions.changeTarget('querybuilder', 'attrKey', 0),
  actions.changeTargetValue('querybuilder', 'data-cat', 0),
  actions.changeTarget('querybuilder', 'attrVal', 0),
  // 33
  actions.changeTargetValue('querybuilder', 'some food', 0),
  actions.changeTarget('querybuilder', 'nodeName', 0),
  actions.changeTargetValue('querybuilder', 'text', 0),
  actions.addClause('querybuilder'),
  actions.changeTarget('querybuilder', 'nodeName', 1),
  actions.changeRule('querybuilder', 'notEquals', 1),
  // 39
  actions.changeTargetValue('querybuilder', 'div', 1),
  actions.removeClause('querybuilder', 0),
  actions.removeClause('querybuilder', 0),
  actions.addClause('querybuilder'),
  // 43
  actions.changeRule('querybuilder', 'like', 0),
  actions.changeTarget('querybuilder', 'text', 0),
  actions.changeTargetValue('querybuilder', 'ice', 0),
  actions.changeTarget('querybuilder', 'attrKey', 0),
  actions.changeTargetValue('querybuilder', 'cat', 0),
  actions.changeTarget('querybuilder', 'attrVal', 0),
  actions.changeTargetValue('querybuilder', 'some', 0),
  actions.changeTarget('querybuilder', 'nodeName', 0),
  // 51
  actions.changeTargetValue('querybuilder', 'p', 0),
  actions.removeClause('querybuilder', 0),
  actions.addClause('querybuilder'),
  // 54
  actions.changeRule('querybuilder', 'notLike', 0),
  actions.changeTarget('querybuilder', 'text', 0),
  actions.changeTargetValue('querybuilder', 'cat', 0),
  actions.changeTarget('querybuilder', 'attrKey', 0),
  actions.changeTargetValue('querybuilder', 'b', 0),
  actions.changeTarget('querybuilder', 'attrVal', 0),
  // 60
  actions.changeTargetValue('querybuilder', 'some', 0),
  actions.changeTargetValue('querybuilder', 'taco', 0),
  actions.changeTarget('querybuilder', 'nodeName', 0),
  actions.changeTargetValue('querybuilder', 'div', 0)
]

export const story = chainActions(baseState, reducer, ...chained)