import { routerReducer } from 'react-router-redux'
import { chainReducers } from '~/src/util'
import sourceSetter from '~/src/containers/sourceSetter/reducer'
import clause, { activeClause } from '~/src/components/clause/reducer'
import { reducer as overlay } from '~/src/containers/overlay'
import { reducer as layout } from '~/src/containers/layout'
import { reducer as navigation } from '~/src/components/navigator'

export default function rootReducer(state, action) {

  let result = chainReducers(
    state,
    action,
    sourceSetter,
    activeClause,
    clause,
    overlay,
    layout,
    navigation
  )

  // console.log(result.slave.mutated.map(o => o.value))

  return result

}
