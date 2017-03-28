import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { startEditor, addClause } from '~/src/components/clause/actions'
import Clause from '~/src/components/clause/clause'
import { colors } from '~/src/styles/constants'
import { callMutator } from '~/src/components/navigator'

const style = (hasView) => ({
  backgroundColor: hasView ? colors.success : colors.inactive
})

const Builder = (props) => (
  <div class="row">
    <div class="col-12 p-0 mb-3">
      <button class="btn p-2 mr-2" onClick={() => props.addClause(props.stateKey)}>
        add clause <i class="fa fa-plus"></i>
      </button>
    </div>
    {props.clauses.map((clause, index) => (
      clause && <Clause stateKey={props.stateKey} key={index} index={index} clause={clause} />
    ))}
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  callMutator: () => dispatch(callMutator()),
  pushRoute: (hash) => dispatch(startEditor(hash)),
  addClause: (stateKey) => dispatch(addClause(stateKey)),
})

export default connect(s => s, mapDispatchToProps)(Builder)
