import * as constants from './constants'

export const skip = () => ({ type: constants.SKIP_ONBOARDING })
export const onboardInit = () => ({ type: constants.ONBOARD_INIT })
export const onboard_5 = () => ({ type: constants.ONBOARD_5 })