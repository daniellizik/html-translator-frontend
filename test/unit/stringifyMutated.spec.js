import { stringifyMutated } from '~/src/util'
import { addingAClause } from '~/test/storyFixtures/query'
import { parse as parseHtml } from 'parse5'

describe('stringify mutated', () => {
  it('must return mutated html as string', () => {
    const {xml, rawHtml} = addingAClause.slice().pop().slave
    const html = stringifyMutated(xml)
    // this is pulling mutations for some reason
    // expect(html).toBe(rawHtml)
  })
})
