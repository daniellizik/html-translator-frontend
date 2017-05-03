import { regular, onboarding } from '~/test/storyFixtures/overlay'

describe('regular overlay behavior', () => {
  it('should start not displayed', () => {
    expect(regular[0].overlay).toBeFalsy()    
  })
  it('should display when source setter is called from nav', () => {
    expect(regular[1].overlay).toBeTruthy()
  })
  it('should dismiss when overlay is clicked', () => {
    expect(regular[2].overlay).toBeFalsy()
  })
  it('should open when source setter is called again', () => {
    expect(regular[3].overlay).toBeTruthy()
  })
  it('should dismiss when source setter is canceled', () => {
    expect(regular[4].overlay).toBeFalsy()
  })
})

describe('onboarding overlay behavior', () => {
  it('should start with overlay visible', () => {
    expect(onboarding[0].overlay).toBeTruthy()
  })
})