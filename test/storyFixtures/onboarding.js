import state from '~/src/store/state'
import reducer from '~/src/store/rootReducer'
import { chainActions } from '~/src/util'
import * as onboarderActions from '~/src/containers/onboarder/actions'
import { clauseActions } from '~/src/components/clause/actions/index'
import { actions as navActions } from '~/src/components/navigator'
import * as sourceSetterActions from '~/src/containers/sourceSetter/actions'
import rawHtml from '~/www/sample-email.html'

export default chainActions(
  state,
  reducer,
  onboarderActions.onboardInit(),
  navActions.callSourceSetter(),
  sourceSetterActions.htmlReceived(rawHtml),
  clauseActions.add()
)