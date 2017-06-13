import * as queries from '~/test/storyFixtures/query'
import * as constants from '~/src/components/clause/constants'
import { defaultQuery } from '~/src/components/clause/settings/config'
import { filterText } from '~/src/util'

describe('query reducer', () => {

  Object.keys(queries).forEach(q => {
    it('should set clauses', () => {
      expect(q[q.length - 1].clauses).toMatchSnapshot()
    })
  })

})