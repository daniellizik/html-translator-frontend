import React, { Component } from 'react'
import styles from '~/src/styles'
import * as config from './config' 

// what is with the unsightly
// ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type]
// all these clauses can either be a query or mutation,
// they must trigger different actions based on the type
// passed via props
// this should be refactored send a .ruleType prop in the action, probably

export const TargetSetter = (props) => (
  <label class="col-12 p-0 m-0">
    change target
    <select 
      class="form-control custom-select" 
      value={props.clause.target} 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeTarget(e.target.value, props.clauseIndex, props.ruleIndex)}>
      {Object.keys(config[props.type].targets).map((p, j) => (
        <option value={p} key={j}>
          {p}
        </option>
      ))}
    </select>
  </label>
)

export const ChangeTargetValue = (props) => (
  <label class="col-12 p-0 m-0">
    change target value
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue} 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const ChangeRule = (props) => (
  <label class="col-12 p-0 m-0">
    change rule
    <select 
      class="form-control custom-select"
      value={props.clause.rule} 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRule(e.target.value, props.clauseIndex, props.ruleIndex)}>
      {config[props.type].targets[props.clause.target || '*'].rules.map((r, i) => (
        <option value={r} key={i}>
          {r}
        </option>
      ))}
    </select>
  </label>
)

export const ChangeRuleValue = (props) => (
  <label class="col-12 p-0 m-0">
    change rule value
    <input 
      type="text"
      class="form-control"
      value={props.clause.ruleValue} 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRuleValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const RegexBodySetter = (props) => (
  <label class="col-12 p-0 m-0">
    change regex body
    <input 
      class="form-control" 
      type="text" 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRuleValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const ChangeRuleValueFlags = (props) => (
  <label class="col-12 p-0 m-0">
    change regex flags
    <input 
      class="form-control" 
      type="text" 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRuleValueFlags(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const AttrKeySetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr key
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue} 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const AttrValSetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr val
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
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
