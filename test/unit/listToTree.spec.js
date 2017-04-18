import listToTree from '~/src/listToTree'
import { chainedDenormalizations } from '~/test/storyFixtures/mutation'
const state = chainedDenormalizations.slice().pop()

// do we even need to do this?
// we already have a flat list...
describe('list to tree', () => {
  it('should convert list to tree', () => {
    const result = listToTree()(state.slave.mutated)
    expect(result.length).toBe(undefined)
    expect(result.id).toBe(0)
  })
})
