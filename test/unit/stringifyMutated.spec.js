import stringifyMutated from '~/src/stringifyMutated'
import { chainedDenormalizations } from '~/test/storyFixtures/mutation'

describe('stringify mutated', () => {
  it('must return mutated html as string', () => {
    const {xml, rawHtml} = chainedDenormalizations.slice().pop().slave
    const html = xml.reduce((acc, {node, row, tokens}) => {
      const depth = new Array(node.depth).fill('  ').join('')
      const line = tokens.map(t => t.value).join('')
      return acc + '\n' + depth + line
    }, '')
    console.log(html)
    // expect(html).toBe(rawHtml)
  })
})
