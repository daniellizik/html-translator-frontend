import {
  addingAClause,
  removingAClause,
  addingAQuery,
  removingAQuery,
  modifyingTextQueries,
  modifyingNodeNameQueries,
  modifyingAttrKeyQueries,
  modifyingAttrValQueries
} from '~/test/storyFixtures/query'
import { defaultQuery } from '~/src/components/clause/settings/config'
import { filterText } from '~/src/util'

describe('adding a clause', () => {
  it('clauses.state should start as empty array', () => {
    expect(addingAClause[0].clauses.length).toBe(0)
  })
  it('should add nested array on every call to addClause', () => {
    expect(addingAClause[1].clauses.length).toBe(1)
    expect(addingAClause[2].clauses.length).toBe(2)
  })
  it('should add default query object when addClause is called', () => {
    expect(addingAClause[1].clauses.length).toBe(1)
    expect(addingAClause[1].clauses[0].queries[0]).toMatchObject(defaultQuery)
  })
  it('should reduce view with default query', () => {
    expect(addingAClause[1].clauses[0].view.length).toBe(0)
    expect(addingAClause[2].clauses[1].view.length).toBe(0)
    expect(addingAClause[3].clauses[2].view.length).toBe(0)
  })
})

describe('removing a clause', () => {
  it('should remove clause by index', () => {
    expect(removingAClause[1].clauses.length).toBe(2)
  })
})

describe('adding a query', () => {
  it('should add to the correct clause', () => {
    expect(addingAQuery[4].clauses[0].queries.length).toBe(5)
  })
  it('should add default query', () => {
    expect(addingAQuery[4].clauses[0].queries.slice(-1).pop()).toMatchObject(defaultQuery)
  })
})

describe('removing a query', () => {
  it('should remove correct query in correct clause', () => {
    expect(removingAQuery[1].clauses[0].queries.length).toBe(4)
    expect(removingAQuery[2].clauses[0].queries.length).toBe(3)
  })
})

describe('modifying TEXT queries', () => {
  it('should work with LIKE', () => {
    expect(modifyingTextQueries[2].clauses[0].view.length).toBe(3)
    expect(modifyingTextQueries[5].clauses[0].view.length).toBe(1)
    expect(modifyingTextQueries[7].clauses[1].view.length).toBe(7)
  })
  it('should work with EQUALS', () => {
    expect(modifyingTextQueries[9].clauses[0].view.length).toBe(1)
    expect(modifyingTextQueries[11].clauses[1].view.length).toBe(1)
  })
  it('should work with NOT_EQUALS', () => {
    expect(modifyingTextQueries[14].clauses[0].view.length).toBeGreaterThanOrEqual(13)
  })
  // smelly!
  it('should work with NOT_LIKE', () => {
    expect(modifyingTextQueries[19]
      .clauses[0]
      .view
      .map(id => modifyingTextQueries[19].slave.list.open.find(o => o.id === id))
      .filter(filterText)
      .length).toBe(1)
  })
  it('should work with REGEX', () => {
    expect(modifyingTextQueries[23].clauses[0].view.length).toBe(1)
  })
})

describe('modifying NODE_NAME queries', () => {
  it('should work with EQUALS', () => {
    expect(modifyingNodeNameQueries[1].clauses[1].view.length).toBe(0)
    expect(modifyingNodeNameQueries[2].clauses[1].view.length).toBe(5)
  })
})

describe('modifying ATTR_KEY queries', () => {
  it('should work with EQUALS', () => {
    expect(modifyingAttrKeyQueries[3].clauses[1].view.length).toBe(1)
    expect(modifyingAttrKeyQueries[4].clauses[1].view.length).toBe(1)
  })
  it('should work with LIKE', () => {
    expect(modifyingAttrKeyQueries[6].clauses[1].view.length).toBe(2)
    expect(modifyingAttrKeyQueries[10].clauses[1].view.length).toBe(1)
  })
  it('should work with NOT_LIKE', () => {
    expect(modifyingAttrKeyQueries[12].clauses[1].view.length).toBe(2)
  })
  it('should work with NOT_EQUALS', () => {
    expect(modifyingAttrKeyQueries[14].clauses[1].view.length).toBe(2)
  })
})

describe('modifying ATTR_VAL queries', () => {
  it('should work with EQUALS', () => {
    expect(modifyingAttrValQueries[3].clauses[1].view.length).toBe(1)
  })
  it('should work with LIKE', () => {
    expect(modifyingAttrValQueries[5].clauses[1].view.length).toBe(2)
  })
  it('should work with NOT_LIKE', () => {
    expect(modifyingAttrValQueries[6].clauses[1].view.length).toBe(2)
  })
  it('should work with NOT_EQUALS', () => {
    expect(modifyingAttrValQueries[7].clauses[1].view.length).toBe(3)
  })
  it('should work with REGEX', () => {
    expect(modifyingAttrValQueries[9].clauses[1].view.length).toBe(2)
  })
})