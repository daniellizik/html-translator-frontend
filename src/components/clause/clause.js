import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import policyValidator from '~/src/components/clause/policies/validator'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'
import * as config from '~/src/components/clause/settings/config'
import { ChangeTarget } from './clauses'
import { ToolTip, ChangeTargetExplanation } from '~/src/components/explanation'

const mapDispatchToProps = (dispatch) => ({
  queryActions: bindActionCreators(queryActions, dispatch),
  mutateActions: bindActionCreators(mutateActions, dispatch),
  clauseActions: bindActionCreators(clauseActions, dispatch)
})

const mapStateToProps = (state) => ({
  ...state,
  currentMutation: state.slave.currentMutation,
  onboardingStep: state.onboarding.step
})

export const Clause = connect(mapStateToProps, mapDispatchToProps)((props) => (
  <div class="py-0 bg-lightGrey">
    {policyValidator(props)}
    <div class="row py-2 m-0">
      <div class="col-4">
        <span onClick={() => props.actionSet[props.type].remove(props.clauseIndex, props.ruleIndex)}>
          {({QUERY: 'remove this query', MUTATION: 'remove this mutation'})[props.type]}
        </span>
      </div>
    </div>
  </div>
))

export const MaximizedClause = connect(mapStateToProps, mapDispatchToProps)(({ 
  currentMutation, 
  clauseActions, 
  queryActions, 
  mutateActions, 
  clauseIndex, 
  clauseGroup,
  onboardingStep
}) => (
  <div
    key={clauseIndex} 
    class="col-12 mx-0 mb-3 py-3 c-white bg-middleGrey">
    <div class="row px-3">
      <label class="col-6 mb-2 mx-0 pl-0 pr-2">
        <p>change target</p>
        <ToolTip
          placement="right"
          destroyTooltipOnHide={true}
          visible={onboardingStep === 4}
          trigger={clauseIndex === 0 ? ['hover'] : []}
          overlay={<ChangeTargetExplanation />}>
          <select 
            class="form-control custom-select"
            onFocus={() => clauseActions.activate(clauseIndex)}
            onChange={({target}) => clauseActions.changeTarget(target.value, clauseIndex)}>
            {config.targets.map((p, j) => (
              <option value={p} key={j}>
                {p}
              </option>
            ))}
          </select>
        </ToolTip>
      </label>

      <div class="col-12 mb-2 mx-0 px-0">
        <button class="btn mr-2 my-1" onClick={() => clauseActions.remove(clauseIndex)}>
          remove this clause
        </button>
        <button class="btn mr-2 my-1" onClick={() => clauseActions.denormalize(currentMutation === clauseIndex ? -1 : clauseIndex)}>
          {currentMutation === clauseIndex ? 'hide mutations' : 'view mutations'}
        </button>
        <button class="btn mr-2 my-1" onClick={() => queryActions.add(clauseIndex)}>
          add a query
        </button>
        <button class="btn mr-2 my-1" onClick={() => mutateActions.add(clauseIndex)}>
          add a mutation
        </button>
      </div>
      <div class="col-12 m-0 p-0">
        <div class="row m-0 p-0">
          <div class="col m-0 p-0">queries</div>
        </div>
        {clauseGroup.queries.map((clause, ruleIndex, {length}) => (
          <Clause 
            type="QUERY"
            actionSet={queryActions}
            clause={clause} 
            isLast={ruleIndex === length - 1} 
            clauseIndex={clauseIndex} 
            ruleIndex={ruleIndex} 
            key={`q-${clauseIndex}-${ruleIndex}`} />
        ))}
        <div class="row m-0 p-0">
          <div class="col m-0 p-0">mutations</div>
        </div>
        {clauseGroup.mutations.map((clause, ruleIndex, {length}) => (
          <Clause 
            type="MUTATION"
            actionSet={mutateActions}
            clause={clause} 
            isLast={ruleIndex === length - 1} 
            clauseIndex={clauseIndex} 
            ruleIndex={ruleIndex} 
            key={`m-${clauseIndex}-${ruleIndex}`} />
        ))}
      </div>
    </div>
  </div>
))

export const MinifiedClause = connect(mapStateToProps, mapDispatchToProps)((props) => (
  null
))