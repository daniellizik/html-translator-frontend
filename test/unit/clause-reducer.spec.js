import story from '~/test/storyFixtures/query'
import { query } from '~/src/components/clause/config'

describe('adding a clause', () => {
  it('clauses.state should start as empty array', () => {
    expect(story[0].clauses.length).toBe(0)
  })
  it('should add nested array on every call to addClause', () => {
    expect(story[1].clauses.length).toBe(1)
    expect(story[2].clauses.length).toBe(2)
  })
  it('should add default query object when addClause is called', () => {
    expect(story[1].clauses[0].length).toBe(1)
    expect(story[1].clauses[0][0]).toMatchObject(query.defaultQuery)
  })
  it('should add an array to slave.view array for every clause added', () => {
    expect(story[1].slave.view.length).toBe(1)
    expect(story[2].slave.view.length).toBe(2)
    expect(story[3].slave.view.length).toBe(3)
  })
})

describe('removing a clause', () => {
  it('should remove clause by index', () => {
    expect(story[4].clauses.length).toBe(2)
  })
})

describe('adding a query', () => {
  it('should add to the correct clause', () => {
    expect(story[8].clauses[0].length).toBe(5)
  })
  it('should add default query', () => {
    expect(story[8].clauses[0].slice(-1).pop()).toMatchObject(query.defaultQuery)
  })
})

describe('removing a query', () => {
  it('should remove correct query in correct clause', () => {
    expect(story[9].clauses[0].length).toBe(4)
    expect(story[10].clauses[0].length).toBe(3)
    expect(story[11].clauses[0].length).toBe(2)
    expect(story[12].clauses[0].length).toBe(1)
  })
})