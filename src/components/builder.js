import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '~/src/styles/constants'
import styles from '~/src/styles'
import { MaximizedClause, MinifiedClause } from '~/src/components/clause/clause'
import { queryActions, mutateActions, clauseActions, builderActions } from '~/src/components/clause/actions/index'
import * as config from '~/src/components/clause/settings/config'
import { ToolTip, AddClauseExplanation } from '~/src/components/explanation'

const style = (hasView) => ({
  backgroundColor: hasView ? colors.success : colors.inactive
})

const btnStyle = (step) => ({
  backgroundColor: step < 5 ? colors.inactive : colors.lightYellow,
  cursor: step < 5 ? 'not-allowed' : 'pointer'
})

const Builder = ({onboardStep, activeClause, clauses, clauseActions, builderActions}) => (
  <div class="row pl-4 px-3 py-3 mb-3">
    <div class="col-12 p-0 mb-3">
      <ToolTip
        placement="topRight"
        destroyTooltipOnHide={true}
        visible={onboardStep === 3}
        overlay={<AddClauseExplanation />}>
          <button style={btnStyle(5)} class="btn p-2 mr-2" onClick={clauseActions.add}>
            add clause
          </button>
      </ToolTip>
      <button style={btnStyle(onboardStep)} class="btn p-2 mr-2" onClick={builderActions.removeAll}>
        remove all clauses
      </button>
      <button style={btnStyle(onboardStep)} class="btn p-2 mr-2" onClick={() => {
        activeClause > -1 && builderActions.denormalizeAll()
        activeClause < 0 && builderActions.hideAllMutations()
      }}>
        {
          (() => {
            if (activeClause < 0)
              return 'hide all mutations'
            else
              return 'view all mutations'
          })()
        }
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