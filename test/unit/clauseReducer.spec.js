import { defaultMutation } from '~/src/components/clause/settings/config'
import * as constants from '~/src/components/clause/constants'
import { removingAClause, renamingAClause, viewSingleMutation } from '~/test/storyFixtures/clause'

describe('clause reducer', () => {

  describe('removing a clause', () => {
    removingAClause.forEach(s => {
      it('should remove a clause', () => {
        expect(s.clauses).toMatchSnapshot()
      })
    })
  })

  describe('renaming a clause', () => {
    renamingAClause.forEach(s => {
      it('should rename a clause when the action is called', () => {
        expect(s.clauses).toMatchSnapshot()
      })
    })
  })

  describe('reducing slave.view', () => {
    viewSingleMutation.forEach(s => {
      it('should generate slave.view for a single clause', () => {
        expect(s.clauses).toMatchSnapshot()
      })
    })
  })

})
