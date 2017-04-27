import initialState from '~/test/stateFixtures/test'
import * as sourceSetterActions from '~/src/containers/sourceSetter/actions'
import { actions as overlayActions } from '~/src/containers/overlay'
import { actions as onboardActions } from '~/src/containers/onboarder'
import { actions as navActions } from '~/src/components/navigator'
import { chainActions } from '~/src/util'
import rootReducer from '~/src/store/rootReducer'

const state = {
  ...initialState,
  overlay: true,  
  user: {
    ...initialState.user,
    onboarding: true
  }
}

export const onboarding = chainActions(
  state,
  rootReducer,
  overlayActions.dismiss(),
  onboardActions.skip(),
  navActions.callSourceSetter(),
  sourceSetterActions.dismiss(),
  navActions.callSourceSetter(),
  overlayActions.dismiss()
)