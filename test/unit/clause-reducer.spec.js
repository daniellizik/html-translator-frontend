import story from '~/test/storyFixtures/query'
import { query } from '~/src/components/clause/config'

describe('clause reducer', () => {

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

})