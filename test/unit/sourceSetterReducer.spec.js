import story from '../storyFixtures/sourceSetter'
import * as config from '~/src/components/clause/settings/config'

describe('source setter', () => {

  it(`should set raw html on raw html change`, () => {
    expect(story[1].source.rawHtml).toBe('b')
    expect(story[4].source.rawHtml).toBe('blah')
  })

  it(`should set url on url change`, () => {
    expect(story[5].source.url).toBe('/cats.html')
  })

  it(`should set raw html on file read done`, () => {
    expect(story[8].source.rawHtml).toBe('cat')
    expect(story[8].source.name).toBe('cats.html')
  })

  it(`should set source props on html received`, () => {
    expect(story[9].slave.rawHtml).toBe('<div>cat</div>')
    expect(story[9].slave.list.list.length).toBeGreaterThan(5)
  })

  it('should reset clauses on submit', () => {
    expect(story[9].clauses).toMatchObject([config.defaultClause])
  })

  it('should reset view on submit', () => {
    expect(story[9].slave.view).toMatchObject([])
    expect(story[9].slave.mutated).toMatchObject([])
  })

  it('should display xml tree on html received', () => {
    expect(story[9].slave.xml.length).toBeGreaterThan(5)
  })

})
