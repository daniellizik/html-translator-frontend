import stringifyMutated from '~/src/stringifyMutated'
import { addingAClause } from '~/test/storyFixtures/query'
import { parse as parseHtml } from 'parse5'

describe('stringify mutated', () => {
  it('must return mutated html as string', () => {
    const {xml, rawHtml} = addingAClause.slice().pop().slave
    const html = stringifyMutated(xml)
    // expect(html).toBe(rawHtml)
  })
})
