import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { startEditor, addClause } from './actions'
import Clause from './clause'
import strings from './strings.json'
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
      {props.stateKey === 'querybuilder' && <button 
        style={style(props.slave.view.length > 0)} 
        class="btn p-2 mr-2" 
        onClick={() => props.callMutator()}>
        edit these queried elements
        <span class="mx-2">({props.slave.view.length / 2})</span>
        <i class="fa fa-pencil-square-o"></i>
      </button>}
    </div>
    {props[props.stateKey].clauses.map((clause, index) => (
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
