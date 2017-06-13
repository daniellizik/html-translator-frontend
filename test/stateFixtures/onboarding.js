import state from '~/src/store/state'
import {story} from '~/test/storyFixtures/onboarding'

export default {
  ...state,
  ...story[9],
}
