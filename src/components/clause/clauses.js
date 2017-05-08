import React from 'react'
import * as config from './settings/config' 
import { id } from '~/src/util'
import { Choice, Text } from './components'
import { 
  ToolTip, 
  ChangeQueryRuleExplanation, 
  ChangeQueryTargetValueExplanation,
  ChangeMutationRuleExplanation,
  ChangeMutationRuleValueExplanation
} from '~/src/components/explanation'

export const ChangeTarget = (props) => (
  <label class="col-12 p-0 m-0" data-clause="change-target">
    <p class="mb-1">change target</p>
    <Choice
      value={props.type !== 'CLAUSE' ? props.clause.rule : props.clauseGroup.target}
      onFocus={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => props.actionSet.changeTarget(e.target.value, props.clauseIndex)}
      options={Object.keys(config[props.type].targets)} />
  </label>
)

export const ChangeTargetValue = (props) => (
  <label class="col-12 p-0 m-0" data-clause="change-target-value">
    <p>change target value</p>
    <ToolTip
      placement="bottom"
      destroyTooltipOnHide={true}
      visible={props.onboardingStep === 7}
      overlay={<ChangeQueryTargetValueExplanation />}>
      <Text 
        onFocus={() => props.clauseActions.activate(props.clauseIndex)}
        onChange={(e) => props.actionSet.changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)}
        value={props.clause.targetValue} />
    </ToolTip>
  </label>
)

export const ChangeRule = (props) => {
  const pureProps = {
    value: props.clause.rule,
    clauseIndex: props.clauseIndex,
    ruleIndex: props.ruleIndex,
    options: config[props.type].targets[props.clauseGroup.target || 'TEXT'].rules,
    onFocus: () => props.clauseActions.activate(props.clauseIndex),
    onChange: (e) => props.actionSet.changeRule(e.target.value, props.clauseIndex, props.ruleIndex)
  }
  const isQuery = props.type === 'QUERY'
  const isMutation = props.type === 'MUTATION'
  const is6 = props.onboardingStep === 6
  const is9 = props.onboardingStep === 9
  const ignore = (isQuery && !is6) || (isMutation && !is9)
  return (
    <label class="col-12 p-0 m-0" data-clause="change-rule">
      <p>change rule</p>
      {ignore && <Choice {...pureProps} />}
      {isQuery && is6 && (
        <ToolTip
          placement="bottom"
          destroyTooltipOnHide={true}
          visible={true}
          overlay={<ChangeQueryRuleExplanation />}>
          <Choice {...pureProps} />
        </ToolTip>
      )}
      {isMutation && is9 && (
        <ToolTip
          placement="bottom"
          destroyTooltipOnHide={true}
          visible={true}
          overlay={<ChangeMutationRuleExplanation />}>
          <Choice {...pureProps} />
        </ToolTip>
      )}
   </label>
  )
}

export const ChangeRuleValue = (props) => {
  const pureProps = {
    value: props.clause.ruleValue,
    clauseIndex: props.clauseIndex,
    ruleIndex: props.ruleIndex,
    onFocus: () => props.clauseActions.activate(props.clauseIndex),
    onChange: (e) => props.actionSet.changeRuleValue(e.target.value, props.clauseIndex, props.ruleIndex)
  }
  return (
    <label class="col-12 p-0 m-0" data-clause="change-rule-value">
      <p>change rule value</p>
      {props.onboardingStep === 10 ? (
        <ToolTip
          placement="bottom"
          destroyTooltipOnHide={true}
          visible={true}
          overlay={<ChangeMutationRuleValueExplanation />}>
          <Text {...pureProps} />
        </ToolTip>
      ) : (
        <Text {...pureProps} />
      )}
    </label>
  )
}

export const RegexBodySetter = (props) => (
  <label class="col-12 p-0 m-0" data-clause="regex-body">
    <p>change regex body</p>
    <input 
      class="form-control"
      type="text"
      onFocus={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => props.actionSet.changeRuleValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const ChangeRuleValueFlags = (props) => (
  <label class="col-12 p-0 m-0" data-clause="change-rule-value-flags">
    <p>change regex flags</p>
    <Text
      onFocus={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => props.actionSet.changeRuleValueFlags(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

// not using any of these right now

export const ChangeBehavior = (props) => (
  <label class="col-12 p-0 m-0" data-clause="change-behavior">
    <p>change behavior</p>
    <Choice 
      value={props.clause.behavior} 
      onFocus={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => props.actionSet.changeBehavior(e.target.value, props.clauseIndex, props.ruleIndex)}
      options={config[props.type].targets[props.clause.target].behaviors} />
  </label>
)

export const AttrKeySetter = (props) => (
  <label class="col-12 p-0 m-0">
    <p>set attr key</p>
    <Text 
      value={props.clause.targetValue} 
      onFocus={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => props.actionSet.changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
  </label>
)

export const AttrValSetter = (props) => (
  <label class="col-12 p-0 m-0">
    <p>set attr val</p>
    <Text 
      value={props.clause.targetValue}
      onFocus={() => props.clauseActions.activate(props.clauseIndex)}
      onChange={(e) => props.actionSet.changeTargetValue(e.target.value, props.clauseIndex, props.ruleIndex)} />
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
