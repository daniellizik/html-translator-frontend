import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { colors } from '~/src/styles/constants'
import iconStyle from '~/src/styles/icon'
import policies from '~/src/components/clause/policies'
import * as actions from './actions'

const clauseStyle = {
  backgroundColor: colors.light,
  position: 'relative'
}
const hrStyle = {
  borderBottom: `1px solid ${colors.lessLight}`
}
const closeStyle = {
  fontSize: '.8em'
}

const Clause = (props) => (
  <div class="py-0" style={clauseStyle}>
    <hr class="mt-1 py-0 mx-3" style={hrStyle} />
    {policies.reduce((acc, policy, i, {length}) => {
      const isValidTarget = policy.target.includes(props.clause.target)
      const isValidRule = policy.rules.includes(props.clause.rule)
      const isValidPolicy = isValidTarget && isValidRule
      const Structure = policy.structure
      return isValidPolicy ? [...acc, <Structure key={i} {...props} />] : acc
    }, [])}
    <div class="row pt-3 m-0" style={closeStyle}>
      <div class="col-12">
        <div>remove this query</div>
      </div>
    </div>
  </div>
)

Clause.propTypes = {
  queryIndex: PropTypes.number.isRequired,
  clauseIndex: PropTypes.number.isRequired,
  clause: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  removeClause: (clauseIndex) => dispatch(actions.removeClause(clauseIndex)),
  changeTarget: (target, clauseIndex, queryIndex) => dispatch(actions.changeTarget(target, clauseIndex, queryIndex)),
  changeTargetValue: (targetValue, clauseIndex, queryIndex) => dispatch(actions.changeTargetValue(targetValue, clauseIndex, queryIndex)),
  changeRule: (rule, clauseIndex, queryIndex) => dispatch(actions.changeRule(rule, clauseIndex, queryIndex)),
  changeRuleValue: (ruleValue, clauseIndex, queryIndex) => dispatch(actions.changeRuleValue(ruleValue, clauseIndex, queryIndex)),
  changeRuleValueFlags: (flags, clauseIndex, queryIndex) => dispatch(actions.changeRuleValueFlags(flags, clauseIndex, queryIndex)),
  // addAttr: (attrKey, attrVal, clauseIndex) => dispatch(actions.addAttr(attrKey, attrVal, clauseIndex)),
  // removeAttrByKey: (attrKey, clauseIndex) => dispatch(actions.removeAttrByKey(attrKey, clauseIndex)),
  // removeAttrByValue: (attrVal, clauseIndex) => dispatch(actions.removeAttrByValue(attrVal, clauseIndex)),
  // removeAllAttrs: (clauseIndex) => dispatch(actions.removeAllAttrs(clauseIndex))
})

const withConnect = connect(s => s, mapDispatchToProps)(Clause)
export default withConnect
