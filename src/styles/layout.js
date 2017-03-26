import * as constants from './constants'
const { phone, tablet, desktop } = constants.mediaqueries

const layoutBase = {
  position: 'absolute',
  height: '100%'
}

export default {
  deployer: {
    [phone]: {},
    [tablet]: {
      ...layoutBase,
      right: 0,
      width: '50%'
    },
    [desktop]: {
      ...layoutBase,
      right: 0,
      width: '60%'
    }
  },
  sidebar: {
    [phone]: {},
    [tablet]: {
      ...layoutBase,
      left: 0,
      width: '50%'
    },
    [desktop]: {
      ...layoutBase,
      left: 0,
      width: '40%'
    }
  }
}
