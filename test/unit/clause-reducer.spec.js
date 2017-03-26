import state from '~/test/stateFixtures/test'
import * as actions from '~/src/components/clause/actions'
import reducer from '~/src/components/clause/reducer'
import config from '~/src/components/clause/config'
import queryclauses from '~/test/stateFixtures/queryclauses'
import { chainActions } from '~/src/util'
import { story } from '~/test/storyFixtures/query'

describe('clause reducer', () => {

  describe('adding a clause', () => {
    const newState = reducer(state, actions.addClause('querybuilder'))
    it('should add a default clause', () => {
      expect(newState.querybuilder.clauses.slice().pop()).toMatchObject(config.querybuilder.defaultClause)
    })
    // adding new clause pushes default which should always result in empty view
    it('should reduce a new view', () => {
      expect(newState.slave.view.length).toBe(0)
    })
    it('should not modify list', () => {
      expect(newState.slave.list).toMatchObject(state.slave.list)
    })
  })

  describe('removing a clause', () => {
    const nodeNameState = reducer(state, actions.removeClause('querybuilder', 1))
    const textState = reducer(state, actions.removeClause('querybuilder', 0))
    it('should remove clause based on index', () => {
      expect(nodeNameState.querybuilder.clauses.slice().pop()).toMatchObject(state.querybuilder.clauses[0])
      expect(textState.querybuilder.clauses.slice().pop()).toMatchObject(state.querybuilder.clauses[1])
    })
    // another reason why putting closing tags in the list/view is bad
    // we have to account for open/close tags
    // holy crap this was a bad idea, now all the tests are extremly fragile
    it('should reduce a new view', () => {
      // one cat-a text node
      expect(nodeNameState.slave.view.length).toBe(2)
      // ten divs
      expect(textState.slave.view.length).toBe(20)
    })
  })

  describe('modifying "regex" clauses', () => {
    it('should work on text nodes', () => {
      expect(story[3].slave.view.length).toBe(0)
      expect(story[5].slave.view.length).toBe(0)
    })
    it('should work on attribute keys', () => {
      expect(story[11].slave.view.length).toBe(4)
    })
    it('should work on attribute vals', () => {
      expect(story[13].slave.view.length).toBe(2)
    })
  })

  describe('modifying "equals" clauses', () => {
    it('should work on text nodes', () => {
      expect(story[18].slave.view.length).toBe(2)
    })
    it('should work on attribute keys', () => {
      expect(story[20].slave.view.length).toBe(2)
    })
    it('should work on attribute values', () => {
      expect(story[22].slave.view.length).toBe(2)
    })
    it('should work on node names', () => {
      expect(story[24].slave.view.length).toBe(10)
    })
  })

  describe('modifying "not equals" clauses', () => {
    it('should work on text nodes', () => {
      // again, treeToList is putting empty text nodes in the list/view
      // kind of awkward
      expect(story[29].slave.view.filter(v => !/^[\s\r\n]+$/.test(v.value)).length).toBe(30)
    })
    it('should work on attribute keys', () => {
      expect(story[31].slave.view.length).toBe(4)
    })
    it('should work on attribute values', () => {
      expect(story[33].slave.view.length).toBe(6)
    })
    it('should work on node names', () => {
      // another weird thing is parse5 puts in #document node
      // very unintuitive
      expect(story[35].slave.view.length).toBe(44)
      expect(story[39].slave.view.length).toBe(24)
    })
  })

  describe('modifying "like" clauses', () => {
    it('should work on text nodes', () => {
      expect(story[45].slave.view.length).toBe(4)
    })
    it('should work on attribute keys', () => {
      expect(story[47].slave.view.length).toBe(4)
    })
    it('should work on attribute values', () => {
      expect(story[49].slave.view.length).toBe(4)
    })
    it('should work on node names', () => {
      expect(story[51].slave.view.length).toBe(12)
    })
  })

  describe('modifying "not like" clauses', () => {
    it('should work on text nodes', () => {
      expect(story[56].slave.view.filter(v => !/^[\s\r\n]+$/.test(v.value)).length).toBe(2)
    })
    it('should work on attribute keys', () => {
      expect(story[58].slave.view.length).toBe(6)
    })
    it('should work on attribute values', () => {
      expect(story[60].slave.view.length).toBe(4)
      expect(story[61].slave.view.length).toBe(6)
    })
    it('should work on node names', () => {
      expect(story[63].slave.view.filter(v => v.nodeName !== '#text').length).toBe(24)
    })
  })


})