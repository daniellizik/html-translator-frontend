import state from '~/test/stateFixtures/test'
const { list } = state.slave

describe('treeToList', () => {

  it('every tag should have a corresponding open/close pair', () => {
    expect(list.list.reduce((acc, {id}, i, arr) => !!list.open[id], false)).toBeTruthy()
  })

  it('root tag closer should be the last closing node', () => {
    expect(list.list.slice(-1).pop().parent).toBe(-1)
  })

  it('should capture comment.data', () => {

  })

})
