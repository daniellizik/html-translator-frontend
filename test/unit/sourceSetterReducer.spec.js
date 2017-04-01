import story from '../storyFixtures/sourceSetter'
import * as constants from '~/src/containers/sourceSetter/constants'

describe('source setter', () => {

  it(`should set raw html on ${constants.HTML_RAW_CHANGE}`, () => {
    expect(story[1].source.rawHtml).toBe('b')
    expect(story[4].source.rawHtml).toBe('blah')
  })

  it(`should set url on ${constants.URL_CHANGE}`, () => {
    expect(story[5].source.url).toBe('/cats.html')
  })

  it(`should set raw html on ${constants.FILE_READ_DONE}`, () => {
    expect(story[8].source.rawHtml).toBe('cat')
    expect(story[8].source.name).toBe('cats.html')
  })

  it(`should set source props on ${constants.HTML_FETCHED}`, () => {
    expect(story[9].slave.ast).toMatchObject({})
    expect(story[9].slave.list).toMatchObject([1])
    expect(story[9].source.name).toBe('blah')
    expect(story[9].slave.rawHtml).toBe('<div>cat</div>')
  })

})
