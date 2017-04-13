import { routerReducer } from 'react-router-redux'
import { chainReducers } from '~/src/util'
import sourceSetter from '~/src/containers/sourceSetter/reducer'

import builder from '~/src/components/clause/reducers/builderReducer'
import clause from '~/src/components/clause/reducers/clauseReducer'
import mutation from '~/src/components/clause/reducers/mutationReducer'
import query from '~/src/components/clause/reducers/queryReducer'
import view from '~/src/components/clause/reducers/viewReducer'

import { reducer as overlay } from '~/src/containers/overlay'
import { reducer as layout } from '~/src/containers/layout'
import { reducer as navigation } from '~/src/components/navigator'
import initialState from './state'

export default (state = initialState, action) => chainReducers(
  state,
  action,
  sourceSetter,
  builder,
  clause,
  mutation,
  query,
  view,
  overlay,
  layout,
  navigation
)