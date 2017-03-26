import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import styles from '~/src/styles'
import * as actions from './actions'
import strings from './strings.json'
import config from './config.json' 

// all of these stateless components
// are needed by clausePolicy, which will
// return a concatenated structure
// based on the policy rules

// for all these components, props is received
// via policies.js originally from the
// Clause component (also stateless)

// these should not be responsible for bootstrap layout?

export const TargetSetter = (props) => (
  <label class="col-12 p-0 m-0">
    target setter
    <select class="form-control custom-select" value={props.clause.target} onChange={(e) => props.changeTarget(props.stateKey, e.target.value, props.index)}>
      {Object.keys(config[props.stateKey].targets).map((p, j) => (
        <option value={p} key={j}>
          {strings[props.locale].targets[p].title}
        </option>
      ))}
    </select>
  </label>
)

export const TargetValueSetter = (props) => (
  <label class="col-12 p-0 m-0">
    target value setter
    <input class="form-control" type="text" value={props.clause.targetValue} onChange={(e) => props.changeTargetValue(props.stateKey, e.target.value, props.index)} />
  </label>
)

export const RuleSetter = (props) => (
  <label class="col-12 p-0 m-0">
    select rule
    <select class="form-control custom-select" value={props.clause.rule} onChange={(e) => props.changeRule(props.stateKey, e.target.value, props.index)}>
      {config[props.stateKey].targets[props.clause.target].rules.map((r, i) => (
        <option value={r} key={i}>{strings[props.locale][props.stateKey].rules[r].title}</option>
      ))}
    </select>
  </label>
)

export const RegexBodySetter = (props) => (
  <label class="col-12 p-0 m-0">
    set regex body
    <input class="form-control" type="text" onChange={(e) => props.changeRuleValue(props.stateKey, e.target.value, props.index)} />
  </label>
)

export const RegexFlagsSetter = (props) => (
  <label class="col-12 p-0 m-0">
    set regex flags
    <input class="form-control" type="text" onChange={(e) => props.changeRuleValueFlags(props.stateKey, e.target.value, props.index)} />
  </label>
)

export const AttrKeySetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr key
    <input class="form-control" type="text" value={props.clause.targetValue} onChange={(e) => props.changeTargetValue(props.stateKey, e.target.value, props.index)} />
  </label>
)

export const AttrValSetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr val
    <input class="form-control" type="text" value={props.clause.targetValue} onChange={(e) => props.changeTargetValue(props.stateKey, e.target.value, props.index)} />
  </label>
)

// separate this
export const AddAttrSetter = (props) => (
  <div>
    <label class="col-12 p-0 m-0">
      add attr val
      <input class="form-control" type="text"  />
    </label>
    <label class="col-12 p-0 m-0">
      add attr key
      <input class="form-control" type="text"  />
    </label>
  </div>
)

// separate this
export const AddAttrMutator = (props) => (
  <div>
    <label class="col-12 p-0 m-0">
      attr name
      <input class="form-control" type="text" />
    </label>
    <label class="col-12 p-0 m-0">
      attr value
      <input class="form-control" type="text" />
    </label>
  </div>
)

export const RemoveAttrByKeyMutator = (props) => (
  <label class="col-12 p-0 m-0">
    <input class="form-control" type="text" />
  </label>
)

export const RemoveAttrByValueMutator = (props) => (
  <label class="col-12 p-0 m-0">
    <input class="form-control" type="text" />
  </label>
)

export const RemoveAllAttrsMutator = (props) => (
  <button></button>
)
