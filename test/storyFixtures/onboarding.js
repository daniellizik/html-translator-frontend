import baseState from '~/test/stateFixtures/onboarding'
import reducer from '~/src/store/rootReducer'
import { chainActions } from '~/src/util'
import { actions as onboarderActions } from '~/src/containers/onboarder'
import { clauseActions } from '~/src/components/clause/actions/index'
import { actions as navActions } from '~/src/components/navigator'
import * as sourceSetterActions from '~/src/containers/sourceSetter/actions'

export default chainActions(
  baseState,
  reducer,
  onboarderActions.onboardInit(),
  navActions.callSourceSetter()
)