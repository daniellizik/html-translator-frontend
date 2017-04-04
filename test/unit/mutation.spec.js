import { defaultMutation } from '~/src/components/clause/config'
import { mutationDenormalizer } from '~/src/components/clause/subReducers'
import {
  allReplaceText,
  reducedMutations
} from '~/test/storyFixtures/mutation'

describe('mutations', () => {
  describe('adding a mutation', () => {
    it('should add mutation type rule to end of rules array', () => {
      expect(allReplaceText[4].clauses[0].mutations.length).toBe(1)
    })
    it('should add default mutation to end of rules array', () => {
      expect(allReplaceText[2].clauses[0].mutations.slice(-1).pop()).toMatchObject(defaultMutation)
    })
  })
  describe('activating a mutation', () => {
    it('should set as active', () => {
      expect(allReplaceText[5].clauses[0].mutations.slice(-1).pop().active).toBeTruthy()
    })
  })
})

describe('mutation denormalizer', () => {
  it('should mutate value as a result of mutation reduction', () => {
    let story = reducedMutations[0]
    let result = mutationDenormalizer(story.clauses[0].view, story.slave.list.open, story.clauses[0].mutations)
    result.forEach(({id, value}) => {
      story.clauses[0].view.indexOf(id) > -1 && expect(value).toBe('blah')
      story.clauses[0].view.indexOf(id) < 0 && expect(value).not.toBe('blah')
    })
    story = reducedMutations[4]
    result = mutationDenormalizer(story.clauses[0].view, story.slave.list.open, story.clauses[0].mutations)
    result.forEach(({id, value}) => {
      story.clauses[0].view.indexOf(id) > -1 && expect(value).toBe('cat blah')
      story.clauses[0].view.indexOf(id) < 0 && expect(value).not.toBe('cat blah')
    })
  })
})