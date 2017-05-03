import initialState from '~/test/stateFixtures/test'
import * as sourceSetterActions from '~/src/containers/sourceSetter/actions'
import { actions as overlayActions } from '~/src/containers/overlay'
import * as onboardActions from '~/src/containers/onboarder/actions'
import { actions as navActions } from '~/src/components/navigator'
import { chainActions } from '~/src/util'
import rootReducer from '~/src/store/rootReducer'

export const regular = chainActions(
  initialState,
  rootReducer,
  navActions.callSourceSetter(),
  overlayActions.dismiss(),
  navActions.callSourceSetter(),
  sourceSetterActions.dismiss()
)

export const onboarding = chainActions(
  {...initialState, overlay: true, onboarding:{step:0}},
  rootReducer,
  navActions.callSourceSetter()
  
)