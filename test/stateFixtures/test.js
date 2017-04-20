import loader from '~/test/htmlFixtures/loader'
import reducer from '~/src/store/rootReducer'
import state from '~/src/store/state'
import sourceSetter from '~/src/containers/sourceSetter/reducer'
import { sourceSubmit } from '~/src/containers/sourceSetter/actions'

export default {
  ...sourceSetter(
    state, 
    sourceSubmit({
      rawHtml: loader(`${__dirname}/../htmlFixtures/cats.html`), 
      lastModified: 'html'})(r => r)
  ),
  clauses: []
}
