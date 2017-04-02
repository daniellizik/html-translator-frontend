import { mutateList } from '~/src/util'
import story from '~/test/storyFixtures/query'

describe('mutate list', () => {
  const mutated = mutateList(story[14].slave.list.list, story[14].clauses[0].view)
  it('should mutate a list', () => {
    expect(mutated.length).toBe(3)
  })
  it('should give node in view view: true prop', () => {
    expect(mutated.filter(m => m.view === true).length).toBe(3)
  })
})