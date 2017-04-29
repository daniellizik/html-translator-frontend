import state from '../storyFixtures/onboarding'

describe('onboarding step 0', () => {
  it('should be at step 0', () => {
    expect(state[0].onboarding.step).toBe(0)
  })
  it('display and modal should be visible', () => {
    expect(state[0].overlay).toBeTruthy()
    expect(state[0].onboarding.state).toBeTruthy()
  })
})

describe('onboarding step 1', () => {
  it('should be at step 1', () => {
    expect(state[1].onboarding.step).toBe(1)
  })
  it('overlay should be visible', () => {
    expect(state[2].overlay).toBeTruthy()
  })
  it('source modal should be visible', () => {
    expect(state[2].source.active).toBeTruthy()
  })
})

describe('onboarding step 2', () => {
  it('should be at step 2', () => {
    expect(state[2].onboarding.step).toBe(2)
  })
  it('should insert sample email url', () => {
    expect(state[2].source.url).toBe('/www/sample-email.html')
    expect(state[2].source.lastModified).toBe('url')
  })
})