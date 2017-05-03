import initialState from './state'
import appReducer from './appReducer'
import { composedReducer as onboardingReducer } from '~/src/containers/onboarder/reducer'

export default (state = initialState, action) => {
  if (state.onboarding.step > -1)
    return onboardingReducer(state, action)
  return appReducer(state, action)
}