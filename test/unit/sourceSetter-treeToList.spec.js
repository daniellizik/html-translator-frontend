import state from '~/test/stateFixtures/test'
const { list } = state.slave

describe('treeToList', () => {

  it('should generate equal number of closing to open/root tags', () => {
    const openingTags = list.filter(({type}) =>  type === 'open' || type === 'root')
    const closingTags = list.filter(({type}) => type === 'close')
    expect(openingTags.length).toBe(closingTags.length)
  })

  it('every tag should have a corresponding open/close pair', () => {
    const expectation = list.reduce((acc, {id}, i) => !!list[id], false)
    expect(expectation).toBeTruthy()
  })

})
