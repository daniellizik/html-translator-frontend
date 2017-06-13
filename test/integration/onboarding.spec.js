import { story, regression, step7regression } from '~/test/storyFixtures/onboarding'
import * as config from '~/src/components/clause/settings/config'

describe('onboarding', () => {

  it('should be at the correct step with overlay display', () => {
    story.forEach(s => {
      expect({
        onboarding: s.onboarding,
        overlay: s.overlay
      }).toMatchSnapshot()
    })
  })

  it('should have correct clauses', () => {
    story.forEach(s => {
      expect(s.clauses).toMatchSnapshot()
    })
  })

  it('should have correct source', () => {
    story.forEach(s => {
      expect(s.source).toMatchSnapshot()
    })
  })

  it('should have correct xml', () => {
    story.forEach(s => {
      expect(s.xml).toMatchSnapshot()
    })
  })

})