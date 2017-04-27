import state from '~/src/store/state'

export default {
  ...state,
  overlay: true,  
  user: {
    ...state.user,
    onboarding: true
  }
}
