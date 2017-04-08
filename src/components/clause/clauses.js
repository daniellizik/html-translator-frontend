import React, { Component } from 'react'
import styles from '~/src/styles'
import * as config from './config' 

export const TargetSetter = (props) => (
  <label class="col-12 p-0 m-0">
    change target
    <select 
      class="form-control custom-select" 
      value={props.clause.target} 
      onChange={(e) => props.queryActions_changeTarget(e.target.value, props.clauseIndex, props.ruleIndex)}>
      {Object.keys(config[props.type].targets).map((p, j) => (
        <option value={p} key={j}>
          {p}
        </option>
      ))}
    </select>
  </label>
)

export const TargetValueSetter = (props) => (
  <label class="col-12 p-0 m-0">
    change target value
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue} 
      onChange={(e) => props.queryActions_changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const ChangeRule = (props) => (
  <label class="col-12 p-0 m-0">
    change rule
    <select 
      class="form-control custom-select"
      value={props.clause.rule} 
      onChange={(e) => props.queryActions_changeRule(e.target.value, props.clauseIndex, props.type, props.ruleIndex)}>
      {config[props.type].targets[props.clause.target || '*'].rules.map((r, i) => (
        <option value={r} key={i}>
          {r}
        </option>
      ))}
    </select>
  </label>
)

export const RegexBodySetter = (props) => (
  <label class="col-12 p-0 m-0">
    change regex body
    <input 
      class="form-control" 
      type="text" 
      onChange={(e) => props.queryActions_changeRuleValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const RegexFlagsSetter = (props) => (
  <label class="col-12 p-0 m-0">
    change regex flags
    <input 
      class="form-control" 
      type="text" 
      onChange={(e) => props.queryActions_changeRuleValueFlags(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const AttrKeySetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr key
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue} 
      onChange={(e) => props.queryActions_changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const AttrValSetter = (props) => (
  <label class="col-12 p-0 m-0">
    set attr val
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue}
      onChange={(e) => props.queryActions_changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
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
