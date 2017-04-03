import * as constants from './constants'

export default {

  container: (height) => ({
    border: `1px solid ${constants.colors.pastel}`,
    borderCollapse: 'collapse'
  }),

  row: () => ({
    border: 'none',
    background: 'transparent',
    fontSize: '12px',
    margin: 0,
    padding: '0px 15px 0px 0px',
  }),

  htmlPreview: () => ({
    fontFamily: 'Inconsolata, monospace'
  }),

  iframe: (height) => ({
    height,
    width: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    boxShadow: 'inset 0px 0px 75px -18px rgba(0,0,0,0.46)',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: '1px solid #848484'
  })

}
