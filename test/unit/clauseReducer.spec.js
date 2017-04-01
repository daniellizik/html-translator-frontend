import story from '~/test/storyFixtures/query'
import { defaultQuery } from '~/src/components/clause/config'
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
    expect(story[1].clauses.length).toBe(1)
    expect(story[1].clauses[0].rules[0]).toMatchObject(defaultQuery)
  })
  it('should reduce view with default query', () => {
    expect(story[1].clauses[0].view.length).toBe(0)
    expect(story[2].clauses[1].view.length).toBe(0)
    expect(story[3].clauses[2].view.length).toBe(0)
  })
})

describe('removing a clause', () => {
  it('should remove clause by index', () => {
    expect(story[4].clauses.length).toBe(2)
  })
})

describe('adding a query', () => {
  it('should add to the correct clause', () => {
    expect(story[8].clauses[0].rules.length).toBe(5)
  })
  it('should add default query', () => {
    expect(story[8].clauses[0].rules.slice(-1).pop()).toMatchObject(defaultQuery)
  })
})

describe('removing a query', () => {
  it('should remove correct query in correct clause', () => {
    expect(story[9].clauses[0].rules.length).toBe(4)
    expect(story[10].clauses[0].rules.length).toBe(3)
  })
})

describe('modifying TEXT queries', () => {
  it('should work with LIKE', () => {
    expect(story[14].clauses[0].view.length).toBe(3)
    expect(story[17].clauses[0].view.length).toBe(1)
    expect(story[19].clauses[1].view.length).toBe(7)
  })
  it('should work with EQUALS', () => {
    expect(story[21].clauses[0].view.length).toBe(1)
    expect(story[23].clauses[1].view.length).toBe(1)
  })
  it('should work with NOT_EQUALS', () => {
    expect(story[27].clauses[0].view.filter(filterText).length).toBe(13)
  })
  it('should work with NOT_LIKE', () => {
    expect(story[31].clauses[0].view.filter(filterText).length).toBe(1)
  })
  it('should work with REGEX', () => {
    expect(story[35].clauses[0].view.filter(filterText).length).toBe(1)
  })
})

describe('modifying NODE_NAME queries', () => {
  it('should work with EQUALS', () => {
    expect(story[36].clauses[1].view.length).toBe(0)
    expect(story[37].clauses[1].view.length).toBe(5)
  })
})

describe('modifying ATTR_KEY queries', () => {
  it('should work with EQUALS', () => {
    expect(story[40].clauses[1].view.length).toBe(1)
    expect(story[41].clauses[1].view.length).toBe(1)
  })
  it('should work with LIKE', () => {
    expect(story[43].clauses[1].view.length).toBe(2)
    expect(story[47].clauses[1].view.length).toBe(1)
  })
  it('should work with NOT_LIKE', () => {
    expect(story[49].clauses[1].view.length).toBe(1)
  })
  it('should work with NOT_EQUALS', () => {
    expect(story[51].clauses[1].view.length).toBe(2)
  })
})

describe('modifying ATTR_VAL queries', () => {
  it('should work with EQUALS', () => {
    expect(story[54].clauses[1].view.length).toBe(1)
  })
  it('should work with LIKE', () => {
    expect(story[56].clauses[1].view.length).toBe(2)
  })
  it('should work with NOT_LIKE', () => {
    expect(story[57].clauses[1].view.length).toBe(2)
  })
  it('should work with NOT_EQUALS', () => {
    expect(story[58].clauses[1].view.length).toBe(3)
  })
  it('should work with REGEX', () => {
    expect(story[60].clauses[1].view.length).toBe(2)
  })
})