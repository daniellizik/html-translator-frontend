import { defaultMutation } from '~/src/components/clause/settings/config'
import * as constants from '~/src/components/clause/constants'
import { chainedDenormalizations } from '~/test/storyFixtures/mutation'

describe('reducing slave.view', () => {
  it('should generate slave.view for reduced clauses', () => {
    const { view } = chainedDenormalizations[13].slave
    const result = {
      'span-good': view.filter(n => !n.close && n.nodeName === 'span-good'),
      'blah-foo': view.filter(n => !n.close && n.value === 'blah-foo')
    }
    expect(result).toMatchSnapshot()
  })
})