import { onboarding } from '~/test/storyFixtures/overlay'

describe('overlay behavior', () => {

  describe('clicking overlay while onboarding', () => {
    it('should not dismiss overlay', () => {
      expect(onboarding[1].overlay).toBeTruthy()
    })
  })

  describe('onboarding with overlay', () => {
    it('should stop onboarding and dismiss overlay when skip is clicked', () => {
      expect(onboarding[0].overlay).toBeTruthy()
      expect(onboarding[0].user.onboarding).toBeTruthy()
      expect(onboarding[2].overlay).toBeFalsy()
      expect(onboarding[2].user.onboarding).toBeFalsy()
    })
  })

  describe('quitting onboarding then using source setter', () => {
    it('should not affect source setter state', () => {
      expect(onboarding[2].source.active).toBeFalsy()
    })
    it('should be able to change html immediately after skipped onboarding', () => {
      expect(onboarding[3].source.active).toBeTruthy()
      expect(onboarding[3].overlay).toBeTruthy()
    })
    it('should be able to dismiss source setter', () => {
      expect(onboarding[4].overlay).toBeFalsy()
      expect(onboarding[4].source.active).toBeFalsy()
    })
  })

  describe('quitting source setter by clicking on overlay', () => {
    it('should dismiss overlay', () => {
      expect(onboarding[6].overlay).toBeFalsy()
      expect(onboarding[6].source.active).toBeFalsy()
    })
  })

})