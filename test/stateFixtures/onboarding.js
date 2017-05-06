import state from '~/src/store/state'
import {story} from '~/test/storyFixtures/onboarding'

export default {
  ...state,
  onboarding: { step: 0 },
  overlay: true,
  ...story[21]
}
