import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import strings from './strings.json'
import styles from '~/src/styles'
import * as actions from './actions'
import policies from './policies'
import iconStyle from '~/src/styles/icon'

const Clause = (props) => (
  <div class="col-10 pb-3 pt-0 px-0 mb-3" style={styles.box.clause}>
    <i style={iconStyle(5, 5)} class="fa fa-times" onClick={() => props.removeClause(props.stateKey, props.index)}></i>
    {policies.reduce((acc, policy, i) => {
      const isValidTarget = policy.target.includes(props.clause.target)
      const isValidRule = policy.rules.includes(props.clause.rule)
      const isValidPolicy = isValidTarget && isValidRule
      const Structure = policy.structure
      return isValidPolicy ? [...acc, <Structure key={i} {...props} />] : acc
    }, [])}
  </div>
)

Clause.propTypes = {
  index: PropTypes.number.isRequired,
  clause: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  removeClause: (stateKey, index) => dispatch(actions.removeClause(stateKey, index)),
  changeTarget: (stateKey, target, index) => dispatch(actions.changeTarget(stateKey, target, index)),
  changeTargetValue: (stateKey, targetValue, index) => dispatch(actions.changeTargetValue(stateKey, targetValue, index)),
  changeRule: (stateKey, rule, index) => dispatch(actions.changeRule(stateKey, rule, index)),
  changeRuleValue: (stateKey, ruleValue, index) => dispatch(actions.changeRuleValue(stateKey, ruleValue, index)),
  changeRuleValueFlags: (stateKey, flags, index) => dispatch(actions.changeRuleValueFlags(stateKey, flags, index)),
  addAttr: (stateKey, attrKey, attrVal, index) => dispatch(actions.addAttr(stateKey, attrKey, attrVal, index)),
  removeAttrByKey: (stateKey, attrKey, index) => dispatch(actions.removeAttrByKey(stateKey, attrKey, index)),
  removeAttrByValue: (stateKey, attrVal, index) => dispatch(actions.removeAttrByValue(stateKey, attrVal, index)),
  removeAllAttrs: (stateKey, index) => dispatch(actions.removeAllAttrs(stateKey, index))
})

const withConnect = connect(s => s, mapDispatchToProps)(Clause)
export default withConnect
