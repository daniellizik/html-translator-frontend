import { mutateList } from '~/src/components/clause/reducers/util'
import { modifyingTextQueries as story } from '~/test/storyFixtures/query'

describe('mutate list', () => {
  const mutated = mutateList(story[2].slave.list.list, story[2].clauses[0].view)
  it('should mutate a list', () => {
    expect(mutated.length).toBe(story[2].slave.list.list.length)
  })
  it('should give node in view view: true prop', () => {
    expect(mutated.filter(m => m.view === true).length).toBe(6)
  })
})