import dev from './dev'

export default {
  ...dev,
  user: {
    ...dev.user,
    onboarding: true
  }
}