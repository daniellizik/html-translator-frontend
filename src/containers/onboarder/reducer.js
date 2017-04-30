import * as clauseConstants from '~/src/components/clause/constants'
import * as constants from './constants'
import clauseReducer from '~/src/components/clause/reducers/clauseReducer'
import { bindConstantsToReducers } from '~/src/util'
import { clauseActions, queryActions, mutateActions, builderActions } from '~/src/components/clause/actions/index'
import { constants as navigatorConstants, reducer as navigatorReducer } from '~/src/components/navigator'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import sourceSetterReducer from '~/src/containers/sourceSetter/reducer'
import xmlReducer from '~/src/components/xml/xmlReducer'
import * as config from '~/src/components/clause/settings/config'

export const composedReducer = bindConstantsToReducers({
  [constants.SKIP_ONBOARDING]: (state) => ({
    ...state,
    overlay: false,
    onboarding: { ...state.onboarding, step: NaN }
  }),
  [constants.ONBOARD_INIT]: (state) => ({
    ...state,
    overlay: false,
    onboarding: { ...state.onboarding, step: 1 }
  }),
  [navigatorConstants.CALL_SOURCESETTER]: (state, action) => {
    const navState = navigatorReducer(state, action)
    const ns = {
      ...navState,
      source: {
        ...navState.source,
        lastModified: 'url',
        url: '/www/sample-email.html'
      },
      onboarding: { ...state.onboarding, step: 2 }
    }
    return ns
  },
  [sourceSetterConstants.HTML_FETCHED]: (state, action) => ({
    ...xmlReducer(sourceSetterReducer(state, action), action),
    clauses: [],
    onboarding: { ...state.onboarding, step: 3 }
  }),
  [clauseConstants.CLAUSE_ADD]: (state, action) => {
    const cr = clauseReducer(state, action)
    return {
      ...cr,
      clauses: [
        {...cr.clauses[0], mutations: []}
      ],
      onboarding: { ...state.onboarding, step: 4 }
    }
  },
  
  [constants.ONBOARD_5]: (state, action) => ({
    ...state,
    onboarding: { ...state.onboarding, step: 5 }
  })
})