import story from '~/test/storyFixtures/query'
import { query } from '~/src/components/clause/config'
import { filterText } from '~/src/util'

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
  it('should reduce view with default query', () => {
    expect(story[1].slave.view[0].length).toBe(0)
    expect(story[2].slave.view[0].length).toBe(0)
    expect(story[3].slave.view[0].length).toBe(0)
  })
})

describe('removing a clause', () => {
  it('should remove clause by index', () => {
    expect(story[4].clauses.length).toBe(2)
  })
  it('should reduce view with remaining clauses', () => {
    expect(story[4].slave.view[0].length).toBe(0)
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
  })
})

describe('modifying TEXT queries', () => {
  it('should work with LIKE', () => {
    expect(story[14].slave.view[0].length).toBe(3)
    expect(story[17].slave.view[0].length).toBe(1)
    expect(story[19].slave.view[1].length).toBe(7)
  })
  it('should work with EQUALS', () => {
    expect(story[21].slave.view[0].length).toBe(1)
    expect(story[23].slave.view[1].length).toBe(1)
  })
  it('should work with NOT_EQUALS', () => {
    expect(story[27].slave.view[0].filter(filterText).length).toBe(13)
  })
  it('should work with NOT_LIKE', () => {
    expect(story[31].slave.view[0].filter(filterText).length).toBe(1)
  })
  it('should work with REGEX', () => {
    expect(story[35].slave.view[0].filter(filterText).length).toBe(1)
  })
})

describe('modifying NODE_NAME queries', () => {
  it('should work with EQUALS', () => {
    expect(story[36].slave.view[1].length).toBe(0)
    expect(story[37].slave.view[1].length).toBe(5)
  })
})

describe('modifying ATTR_KEY queries', () => {
  it('should work with EQUALS', () => {
    expect(story[40].slave.view[1].length).toBe(1)
    expect(story[41].slave.view[1].length).toBe(1)
  })
  it('should work with LIKE', () => {
    expect(story[43].slave.view[1].length).toBe(2)
    expect(story[47].slave.view[1].length).toBe(1)
  })
  it('should work with NOT_LIKE', () => {
    expect(story[49].slave.view[1].length).toBe(1)
  })
  it('should work with NOT_EQUALS', () => {
    expect(story[51].slave.view[1].length).toBe(2)
  })
})

describe('modifying ATTR_VAL queries', () => {
  it('should work with EQUALS', () => {
    expect(story[54].slave.view[1].length).toBe(1)
  })
  it('should work with LIKE', () => {
    expect(story[56].slave.view[1].length).toBe(2)
  })
  it('should work with NOT_LIKE', () => {
    expect(story[57].slave.view[1].length).toBe(2)
  })
  it('should work with NOT_EQUALS', () => {
    expect(story[58].slave.view[1].length).toBe(3)
  })
  it('should work with REGEX', () => {
    expect(story[60].slave.view[1].length).toBe(2)
  })
})