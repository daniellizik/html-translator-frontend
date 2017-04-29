import reducer from '~/src/store/rootReducer'
import state from '~/src/store/state'
import sourceSetter from '~/src/containers/sourceSetter/reducer'
import { submit } from '~/src/containers/sourceSetter/actions'
import rawHtml from '~/test/htmlFixtures/cats.html'

export default {
  ...sourceSetter(
    state, 
    submit({rawHtml, lastModified: 'html'})(a => a)
  ),
  clauses: []
}