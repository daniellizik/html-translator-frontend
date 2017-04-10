import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '~/src/styles/constants'
import iconStyle from '~/src/styles/icon'
import policyValidator from '~/src/components/clause/policies/validator'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'

const hrStyle = {
  borderBottom: `1px solid black`
}
const closeStyle = {
  fontSize: '.8em'
}

const Clause = (props) => (
  <div class="py-0">
    <hr class="mt-1 py-0 mx-3" style={hrStyle} />
    {policyValidator(props)}
    <div class="row py-2 m-0" style={closeStyle}>
      <div class="col-3">
        <span onClick={() => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].remove(props.clauseIndex, props.ruleIndex)}>
          {({QUERY: 'remove this query', MUTATION: 'remove this mutation'})[props.type]}
        </span>
      </div>
    </div>
  </div>
)

Clause.propTypes = {
  type: PropTypes.oneOf(['QUERY', 'MUTATION']),
  isLast: PropTypes.bool.isRequired,
  ruleIndex: PropTypes.number,
  clauseIndex: PropTypes.number,
  clause: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  queryActions: bindActionCreators(queryActions, dispatch),
  mutateActions: bindActionCreators(mutateActions, dispatch),
  clauseActions: bindActionCreators(clauseActions, dispatch)
})

const withConnect = connect(s => s, mapDispatchToProps)(Clause)
export default withConnect
