import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '~/src/styles/constants'
import iconStyle from '~/src/styles/icon'
import policyValidator from '~/src/components/policies/validator'
import * as actions from './actions'

const hrStyle = {
  borderBottom: `1px solid black`
}
const closeStyle = {
  fontSize: '.8em'
}

const RemoveButton = (props) => {
  if (props.type === 'QUERY')
    return <span onClick={() => props.removeQuery(props.clauseIndex, props.queryIndex)}>remove this query</span>
  if (props.type === 'MUTATION')
    return <span onClick={() => props.removeMutation(props.clauseIndex, props.mutationIndex)}>remove this mutation</span>
}

const Clause = (props) => (
  <div class="py-0">
    <hr class="mt-1 py-0 mx-3" style={hrStyle} />
    {policyValidator(props)}
    <div class="row py-2 m-0" style={closeStyle}>
      <div class="col-3">
        <RemoveButton {...props} />
      </div>
    </div>
  </div>
)

Clause.propTypes = {
  type: PropTypes.oneOf(['QUERY', 'MUTATION']),
  isLast: PropTypes.bool.isRequired,
  queryIndex: PropTypes.number,
  clauseIndex: PropTypes.number,
  clause: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(s => s, mapDispatchToProps)(Clause)
export default withConnect
