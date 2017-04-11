import React from 'react'
import styles from '~/src/styles'
import * as config from './settings/config' 

// what is with the unsightly
// ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type]
// all these clauses can either be a query or mutation,
// they must trigger different actions based on the type
// passed via props
// this should be refactored send a .ruleType prop in the action, probably

export const TargetSetter = (props) => (
  <label class="col-12 p-0 m-0">
    <p>change target</p>
    <select 
      class="form-control custom-select" 
      value={props.clause.target}
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
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
    <p>change target value</p>
    <input 
      class="form-control" 
      type="text" 
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      value={props.clause.targetValue} 
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const ChangeRule = (props) => (
  <label class="col-12 p-0 m-0">
    <p>change rule</p>
    <select 
      class="form-control custom-select"
      value={props.clause.rule} 
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRule(e.target.value, props.clauseIndex, props.ruleIndex)}>
      {config[props.type].targets[props.clause.target || 'TEXT'].rules.map((r, i) => (
        <option value={r} key={i}>
          {r}
        </option>
      ))}
    </select>
  </label>
)

export const ChangeRuleValue = (props) => (
  <label class="col-12 p-0 m-0">
    <p>change rule value</p>
    <input 
      type="text"
      class="form-control"
      value={props.clause.ruleValue} 
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRuleValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const RegexBodySetter = (props) => (
  <label class="col-12 p-0 m-0">
    <p>change regex body</p>
    <input 
      class="form-control" 
      type="text"
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRuleValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const ChangeRuleValueFlags = (props) => (
  <label class="col-12 p-0 m-0">
    <p>change regex flags</p>
    <input 
      class="form-control" 
      type="text" 
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeRuleValueFlags(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const ChangeBehavior = (props) => (
  <label class="col-12 p-0 m-0">
    <p>change behavior</p>
    <select 
      class="form-control custom-select"
      value={props.clause.behavior} 
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeBehavior(e.target.value, props.clauseIndex, props.ruleIndex)}>
      {config[props.type].targets[props.clause.target].behaviors.map((r, i) => (
        <option value={r} key={i}>
          {r}
        </option>
      ))}
    </select>
  </label>
)

export const AttrKeySetter = (props) => (
  <label class="col-12 p-0 m-0">
    <p>set attr key</p>
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue} 
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const AttrValSetter = (props) => (
  <label class="col-12 p-0 m-0">
    <p>set attr val</p>
    <input 
      class="form-control" 
      type="text" 
      value={props.clause.targetValue}
      onClick={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

// separate this
export const AddAttrSetter = (props) => (
  <div>
    <label class="col-12 p-0 m-0">
      <p>add attr val</p>
      <input class="form-control" type="text"  />
    </label>
    <label class="col-12 p-0 m-0">
      <p>add attr key</p>
      <input class="form-control" type="text"  />
    </label>
  </div>
)

// separate this
export const AddAttrMutator = (props) => (
  <div>
    <label class="col-12 p-0 m-0">
      <p>attr name</p>
      <input class="form-control" type="text" />
    </label>
    <label class="col-12 p-0 m-0">
      <p>attr value</p>
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
