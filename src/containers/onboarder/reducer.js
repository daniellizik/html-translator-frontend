import * as clauseConstants from '~/src/components/clause/constants'
import * as constants from './constants'
import clauseReducer from '~/src/components/clause/reducers/clauseReducer'
import { bindConstantsToReducers } from '~/src/util'
import { constants as navigatorConstants, reducer as navigatorReducer } from '~/src/components/navigator'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import sourceSetterReducer from '~/src/containers/sourceSetter/reducer'
import xmlReducer from '~/src/components/xml/xmlReducer'
import * as config from '~/src/components/clause/settings/config'
import appReducer from '~/src/store/appReducer'

export const composedReducer = (state, action) => {
  switch (action.type) {
    case constants.SKIP_ONBOARDING:
      return {
        ...state,
        overlay: false,
        onboarding: { ...state.onboarding, step: -1 }
      }
    case constants.ONBOARD_INIT:
      return {
        ...state,
        overlay: false,
        onboarding: { ...state.onboarding, step: 1 }
      }
    case navigatorConstants.CALL_SOURCESETTER: {
      const prevState = navigatorReducer(state, action)
      return {
        ...prevState,
        source: {
          ...prevState.source,
          lastModified: 'url',
          url: '/www/sample-email.html'
        },
        onboarding: { ...state.onboarding, step: 2 }
      }
    }
    case sourceSetterConstants.HTML_FETCHED:
      return {
        ...xmlReducer(sourceSetterReducer(state, action), action),
        clauses: [],
        onboarding: { ...state.onboarding, step: 3 }
      }
    case clauseConstants.CLAUSE_ADD: {
      if (state.onboarding.step !== 3)
        return state
      const prevState = clauseReducer(state, action)
      return {
        ...prevState,
        clauses: [
          {...prevState.clauses[0], queries: [], mutations: []}
        ],
        onboarding: { ...state.onboarding, step: 4 }
      }
    }
    case constants.STEP_4:
      return {
        ...state,
        onboarding: { ...state.onboarding, step: 5 }
      }
    // can only add query on step 5
    case clauseConstants.QUERY_ADD:
      return state.onboarding.step === 5 ? {
        ...state,
        clauses: [
          {...state.clauses[0], queries: [config.defaultQuery]}
        ],
        onboarding: { ...state.onboarding, step: 6 }
      } : state
    case constants.STEP_6:
      return {
        ...state,
        onboarding: { ...state.onboarding, step: 7 }
      }
    case clauseConstants.CLAUSE_CHANGE_TARGET:
    case clauseConstants.QUERY_CHANGE_RULE:
      return appReducer(state, action)
    // goes to next step if user enters query that results in viewed nodes
    // next step should disable all these
    case clauseConstants.QUERY_CHANGE_TARGET_VALUE: {
      if (state.onboarding.step !== 7)
        return state
      const nextState = appReducer(state, action)
      if (nextState.clauses[0].view.length > 0)
        return { 
          ...nextState, 
          onboarding: {
            ...nextState.onboarding,
            step: 8
          }
        }
      else
        return nextState
    }
    // can only add mutation on step 8
    case clauseConstants.MUTATION_ADD:
      return state.onboarding.step === 8 ? {
        ...appReducer(state, action),
        onboarding: {
          ...state.onboarding,
          step: 9
        }
      } : state
    case constants.STEP_9:
      return {
        ...state,
        onboarding: { ...state.onboarding, step: 10 }
      }
    case clauseConstants.MUTATION_CHANGE_RULE:
      return state.onboarding.step === 10 
        ? appReducer(state, action)
        : state
    // on step 10, user must enter 4 characters to proceed
    case clauseConstants.MUTATION_CHANGE_RULE_VALUE: {
      if (state.onboarding.step !== 10)
        return state
      const prevState = appReducer(state, action)
      if (prevState.clauses[0].mutations[0].ruleValue.length < 4)
        return prevState
      return {
        ...prevState,
        onboarding: {
          ...state.onboarding,
          step: 11
        }
      }
    }
    case clauseConstants.CLAUSE_DENORMALIZE_MUTATIONS: 
      return state.onboarding.step !== 11 
        ? state 
        : clauseReducer(state, action) 
    default:
      return state
  }
}