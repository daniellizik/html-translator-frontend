// use this to chain a crap load of stories
// mimicks what a user might do
// keep a history of state changes and run assertions on those

import * as constants from '~/src/components/clause/constants'
import state from '~/test/stateFixtures/test'
import * as actions from '~/src/components/clause/actions'
import reducer from '~/src/components/clause/reducer'
import config from '~/src/components/clause/config'
import { chainActions } from '~/src/util'

export default chainActions(
  { ...state, querybuilder: {clauses: []} },
  reducer,
  actions.addClause(),
  actions.addClause(),
  actions.addClause()
  
)