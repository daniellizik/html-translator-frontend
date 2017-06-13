import { modifyingTextQueries as story } from '~/test/storyFixtures/query'

describe('mutate list', () => {
  it('should mutate list', () => {
    expect(story[story.length - 1].slave.list).toMatchSnapshot()
  })
})