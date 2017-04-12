import { defaultMutation } from '~/src/components/clause/settings/config'
import * as constants from '~/src/components/clause/constants'
import { chainedDenormalizations } from '~/test/storyFixtures/mutation'

describe('reducing slave.view', () => {
  it('should generate slave.view for reduced clauses', () => {
    const { view } = chainedDenormalizations[13].slave
    expect(view.filter(n => !n.close && n.nodeName === 'span-good').length).toBe(5)
    expect(view.filter(n => !n.close && n.value === 'blah-foo').length).toBe(3)
  })
})