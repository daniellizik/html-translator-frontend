import state from '~/src/store/state'

export default {
  ...state,
  overlay: true,
  onboarding: {
    ...state.onboarding,
    state: true
  }
}
