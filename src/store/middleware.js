
export const logger = ({getState}) => (next) => (action) => {
  // console.log(action)
  // console.log(getState())
  // console.log(action, getState().slave.xml.filter(n => n.node.viewIndex).slice(0, 5).map(n => n.node.id))
  return next(action)
}

export const rxcrx = () => {
  return window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (next) => next
}
