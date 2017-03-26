import * as constants from './constants'

const { colors } = constants

export default {
  globals: {
    lineHeight: '50px',
    color: colors.contrast,
    cursor: 'pointer'
  },
  nav: {
    margin: '0px 10px 0px 10px',
    display: 'inline'
  },
  divider: {
    margin: '0px 10px 0px 10px',
    width: '1px',
    height: '60%',
    position: 'relative',
    top: '20%',
    display: 'inline',
    borderLeft: `1px solid ${colors.light}`
  }
}
