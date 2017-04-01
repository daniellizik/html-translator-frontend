import state from '~/test/stateFixtures/test'
const { list } = state.slave

describe('treeToList', () => {

  it('should generate equal number of closing to open/root tags', () => {
    expect(list.open.length).toBe(list.close.length)
  })

  it('every tag should have a corresponding open/close pair', () => {
    const expectation = list.close.reduce((acc, {id}, i, arr) => !!list.open[id], false)
    expect(expectation).toBeTruthy()
  })

  it('root tag closer should be the last closing node', () => {
    expect(list.close.slice(-1).pop().parent).toBe(-1)
  })

})
