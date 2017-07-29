import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import policyValidator from '~/src/components/clause/policies/validator'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'
import * as config from '~/src/components/clause/settings/config'
import { ChangeTarget } from './clauses'
import settings from '~/src/settings.json'
import { 
  ToolTip, 
  FadingToolTip, 
  ChangeTargetExplanation, 
  AddQueryExplanation, 
  AddMutationExplanation,
  ViewMutationsExplanation
} from '~/src/components/explanation'

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
  <div class="py-0 c-contrast bg-weak">
    {policyValidator(props)}
    <div class="row py-2 m-0">
      <div class="col-4">
        <span onClick={() => props.actionSet.remove(props.clauseIndex, props.ruleIndex)}>
          {({QUERY: 'remove this query', MUTATION: 'remove this mutation'})[props.type]}
        </span>
      </div>
    </div>
  </div>
))

const AddMutation = ({mutateActions, clauseIndex}) => (
  <button class="btn mr-2 my-1" onClick={() => mutateActions.add(clauseIndex)}>
    add a mutation
  </button>
)

export const MaximizedClause = connect(mapStateToProps, mapDispatchToProps)(({ 
  currentMutation, 
  clauseActions, 
  queryActions, 
  mutateActions, 
  clauseIndex, 
  clauseGroup,
  onboardingStep
}) => (
  <form
    key={clauseIndex}
    onSubmit={e => { e.preventDefault(); clauseActions.submit(clauseIndex); return false; }}
    class="col-12 mx-0 mb-3 py-3 c-subcontrast bg-neutral">
    <div class="row px-3">
    <input 
      type="submit"
      title="submit this clause" 
      class="btn col-12 mb-2 mx-0 p-2" />
      <label class="col-6 mb-2 mx-0 pl-0 pr-2">
        <ToolTip
          placement="right"
          destroyTooltipOnHide={true}
          visible={onboardingStep === 4}
          overlay={<ChangeTargetExplanation />}>
          <ChangeTarget
            type="CLAUSE"
            clauseGroup={clauseGroup}
            clauseActions={clauseActions}
            clauseIndex={clauseIndex}
            actionSet={clauseActions}
            clause={clauseGroup} />
        </ToolTip>
      </label>

      <div class="col-12 mb-2 mx-0 px-0">
        <button class="btn mr-2 my-1" onClick={() => clauseActions.remove(clauseIndex)}>
          remove this clause
        </button>
        <ToolTip
          placement="bottom"
          destroyTooltipOnHide={true}
          visible={onboardingStep === 11}
          overlay={<ViewMutationsExplanation />}>
          <button class="btn mr-2 my-1" onClick={() => clauseActions.denormalize(currentMutation === clauseIndex ? -1 : clauseIndex)}>
            {currentMutation === clauseIndex ? 'hide mutations' : 'view mutations'}
          </button>
        </ToolTip>
        <ToolTip
          placement="bottom"
          destroyTooltipOnHide={true}
          visible={onboardingStep === 5}
          trigger={clauseIndex === 0 ? ['hover'] : []}
          overlay={<AddQueryExplanation />}>
          <button class="btn mr-2 my-1" onClick={() => queryActions.add(clauseIndex)}>
            add a query
          </button>
        </ToolTip>
        {
          onboardingStep === 8
            ? (
                <FadingToolTip
                  placement="bottomLeft"
                  overlay={({visible}) => <AddMutationExplanation />}
                  visible={true}
                  fade={(settings.onboarding_fade_max + 1) * settings.onboarding_fade_delay}>
                  <AddMutation 
                    clauseGroup={clauseGroup} 
                    mutateActions={mutateActions} 
                    clauseIndex={clauseIndex} />
                </FadingToolTip>
              ) 
            : (
                <AddMutation 
                clauseGroup={clauseGroup}
                mutateActions={mutateActions} 
                clauseIndex={clauseIndex} />
              )
        }
      </div>
      <div class="col-12 m-0 p-0">
        <div class="row mx-0 mb-1 p-0">
          {clauseGroup.queries.length > 0 && <div class="col m-0 p-0">queries</div>}
        </div>
        {clauseGroup.queries.map((clause, ruleIndex, {length}) => (
          <Clause 
            type="QUERY"
            clauseGroup={clauseGroup}
            actionSet={queryActions}
            clause={clause} 
            isLast={ruleIndex === length - 1} 
            clauseIndex={clauseIndex} 
            ruleIndex={ruleIndex} 
            key={`q-${clauseIndex}-${ruleIndex}`} />
        ))}
        <div class="row mx-0 my-1 p-0">
          {clauseGroup.mutations.length > 0 && <div class="col m-0 p-0">mutations</div>}
        </div>
        {clauseGroup.mutations.map((clause, ruleIndex, {length}) => (
          <Clause 
            type="MUTATION"
            clauseGroup={clauseGroup}
            actionSet={mutateActions}
            clause={clause} 
            isLast={ruleIndex === length - 1} 
            clauseIndex={clauseIndex} 
            ruleIndex={ruleIndex} 
            key={`m-${clauseIndex}-${ruleIndex}`} />
        ))}
      </div>
    </div>
  </form>
))

export const MinifiedClause = connect(mapStateToProps, mapDispatchToProps)((props) => (
  null
))