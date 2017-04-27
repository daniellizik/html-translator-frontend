import loader from '~/test/htmlFixtures/loader'
import reducer from '~/src/store/rootReducer'
import state from '~/src/store/state'
import sourceSetter from '~/src/containers/sourceSetter/reducer'
import { submit } from '~/src/containers/sourceSetter/actions'

export default {
  ...sourceSetter(
    state, 
    submit({
      rawHtml: loader(`${__dirname}/../htmlFixtures/cats.html`), 
      lastModified: 'html'
    })(r => r)
  ),
  clauses: []
}
