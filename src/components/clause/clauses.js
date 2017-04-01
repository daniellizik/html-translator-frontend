import React, { Component } from 'react'
import styles from '~/src/styles'
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
    <select 
      class="form-control custom-select" 
      value={props.clause.target} 
      onChange={(e) => props.changeTarget(e.target.value, props.clauseIndex, props.queryIndex)}>
      {Object.keys(config[props.clause.type].targets).map((p, j) => (
        <option value={p} key={j}>
          {p}
        </option>
      ))}
    </select>
  </label>
)

export const TargetValueSetter = (props) => (
  <label class="col-12 p-0 m-0">
    target value setter
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue} 
      onChange={(e) => props.changeTargetValue(e.target.value, props.clauseIndex, props.queryIndex)} />
  </label>
)

export const RuleSetter = (props) => (
  <label class="col-12 p-0 m-0">
    select rule
    <select 
      class="form-control custom-select" 
      value={props.clause.rule} 
      onChange={(e) => props.changeRule(e.target.value, props.clauseIndex, props.queryIndex)}>
      {config[props.clause.type].targets[props.clause.target].rules.map((r, i) => (
        <option value={r} key={i}>
          {r}
        </option>
      ))}
    </select>
  </label>
)

export const RegexBodySetter = (props) => (
  <label class="col-12 p-0 m-0">
    set regex body
    <input 
      class="form-control" 
      type="text" 
      onChange={(e) => props.changeRuleValue(e.target.value, props.clauseIndex, props.queryIndex)} />
  </label>
)

export const RegexFlagsSetter = (props) => (
  <label class="col-12 p-0 m-0">
    set regex flags
    <input 
      class="form-control" 
      type="text" 
      onChange={(e) => props.changeRuleValueFlags(e.target.value, props.clauseIndex, props.queryIndex)} />
  </label>
)

export const AttrKeySetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr key
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue} 
      onChange={(e) => props.changeTargetValue(e.target.value, props.clauseIndex, props.queryIndex)} />
  </label>
)

export const AttrValSetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr val
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue}
      onChange={(e) => props.changeTargetValue(e.target.value, props.clauseIndex, props.queryIndex)} />
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
