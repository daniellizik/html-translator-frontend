import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MaximizedClause, MinifiedClause } from '~/src/components/clause/clause'
import { queryActions, mutateActions, clauseActions, builderActions } from '~/src/components/clause/actions/index'
import * as config from '~/src/components/clause/settings/config'
import { ToolTip, AddClauseExplanation } from '~/src/components/explanation'

const Builder = ({onboardStep, activeClause, clauses, clauseActions, builderActions}) => (
  <div class="row px-4 py-3 mb-3">
    <div class="col-12 p-0 mb-3">
      <ToolTip
        placement="topRight"
        destroyTooltipOnHide={true}
        visible={onboardStep === 3 || onboardStep === 12}
        overlay={<AddClauseExplanation step={onboardStep} />}>
          <button class="btn p-2 mr-2 mouse-point" onClick={clauseActions.add}>
            add clause
          </button>
      </ToolTip>
      <button 
        class={`btn p-2 mr-2 ${onboardStep < 5 ? 'bg-inactive mouse-disable' : 'bg-highlight mouse-point'}`} 
        onClick={builderActions.removeAll}>
        remove all clauses
      </button>
      <button 
        class={`btn p-2 mr-2 ${onboardStep < 5 ? 'bg-inactive mouse-disable' : 'bg-highlight mouse-point'}`} 
        onClick={() => {
        activeClause > -1 && builderActions.denormalizeAll()
        activeClause < 0 && builderActions.hideAllMutations()
      }}>
        {activeClause < 0 ? 'hide all mutations' : 'view all mutations'}
      </button>
    </div>
    {clauses.map((clauseGroup, clauseIndex) => (
      clauseGroup.minimized === false 
        ? <MaximizedClause key={clauseIndex} clauseIndex={clauseIndex} clauseGroup={clauseGroup} />
        : <MaximizedClause key={clauseIndex} clauseIndex={clauseIndex} clauseGroup={clauseGroup} />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  ...state,
  onboardStep: state.onboarding.step
})

const mapDispatchToProps = (dispatch) => ({
  queryActions: bindActionCreators(queryActions, dispatch),
  mutateActions: bindActionCreators(mutateActions, dispatch),
  clauseActions: bindActionCreators(clauseActions, dispatch),
  builderActions: bindActionCreators(builderActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Builder)