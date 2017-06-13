import { omit } from '~/src/util'
import * as mutations from '~/test/storyFixtures/mutation'

const fixtures = Object.keys(mutations).reduce((acc, m) => {
  return {
    ...acc,
    [m]: mutations[m].map(s => {
      return {
        ...s,
        slave: omit(s.source, 'rawHtml')
      }
    })
  }
}, {})

describe('mutation reducer', () => {

  describe('replace all text', () => {
    it('should replace all text', () => {
      expect(fixtures.allReplaceText.pop()).toMatchSnapshot()
    })
  })

  describe('reduce mutations', () => {
    it('should reduce mutations', () => {
      expect(fixtures.reducedMutations.pop()).toMatchSnapshot()
    })
  })

  describe('regex mutation', () => {
    it('should mutate with regex', () => {
      expect(fixtures.regexMutation.pop()).toMatchSnapshot()
    })
  })

  describe('toggling', () => {
    it('should toggle view', () => {
      expect(fixtures.toggling.pop()).toMatchSnapshot()
    })
  })

  describe('mutating nodename', () => {
    it('should mutate nodename', () => {
      expect(fixtures.nodename.pop()).toMatchSnapshot()
    })
  })

 describe('chain denormalizations', () => {
    it('should chain', () => {
      expect(fixtures.chainedDenormalizations.pop()).toMatchSnapshot()
    })
  })

})
