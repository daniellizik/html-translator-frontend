import { defaultMutation } from '~/src/components/clause/settings/config'
import * as constants from '~/src/components/clause/constants'
import {
  allReplaceText,
  reducedMutations,
  regexMutation,
  toggling,
  nodename
} from '~/test/storyFixtures/mutation'


describe('adding a mutation', () => {
  it('should add mutation type rule to end of rules array', () => {
    expect(allReplaceText[5].clauses[0].mutations.length).toBe(1)
  })
  it('should add default mutation to end of rules array', () => {
    expect(allReplaceText[2].clauses[0].mutations.slice(-1).pop()).toMatchObject(defaultMutation)
  })
})

describe('activating a mutation', () => {
  it('should set as active', () => {
    expect(allReplaceText[6].clauses[0].mutations.slice(-1).pop().active).toBeTruthy()
  })
})

describe('mutation denormalizer', () => {
  it('should mutate value as a result of mutation reduction', () => {
    reducedMutations[5].slave.mutated.forEach(node => {
      node.nodeName === 'text' && expect(node.value.indexOf('blah')).toBe(-1)
    })
  })
})

describe('regex mutation', () => {
  it('should denormalize mutate with regex replace', () => {
    regexMutation[7].slave.mutated.filter(o => o.value).forEach(obj => {
      expect(obj.value.indexOf('cat')).toBe(-1)
    })
    regexMutation[13].slave.mutated.filter(o => o.value).forEach(obj => {
      obj.value.indexOf('foobar') > -1 && expect(obj.value.indexOf('eanu')).toBe(-1)
    })
  })
  it('should throw when view mutations called with invalid regex', () => {
    expect(regexMutation[15].error).toBe(constants.CLAUSE_ERROR_INVALID_REGEX)
  })
})

describe('toggling a mutation', () => {
  it('should set slave.currentMutation to number passed to action', () => {
    expect(toggling[1].slave.currentMutation).toBe(0)
    expect(toggling[2].slave.currentMutation).toBe(-1)
    expect(toggling[3].slave.currentMutation).toBe(1)
  })
})

describe('mutating nodename', () => {
  it('should mutate nodename', () => {
    nodename[11].slave.mutated.forEach(n => {
      expect(n.nodeName).not.toBe('span')
    })
  })
})


