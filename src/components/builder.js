import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '~/src/styles/constants'
import styles from '~/src/styles'
import Clause from '~/src/components/clause/clause'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'


const style = (hasView) => ({
  backgroundColor: hasView ? colors.success : colors.inactive
})

const clauseStyle = {
  background: colors.middleGrey,
  color: colors.white
}

const btnStyle = {
  backgroundColor: colors.lightYellow
}

const MaximizedClause = ({ currentMutation, clauseActions, queryActions, mutateActions, clauseIndex, clauseGroup }) => (
  <div
    onClick={() => clauseActions.activate(clauseIndex)}
    key={clauseIndex} 
    class="col-12 mx-0 my-2 py-3" 
    style={clauseStyle}>
    <div class="row">
      <div class="col-12 mb-2">
        <input 
          type="text"
          class="form-control"
          onChange={(e) => clauseActions.changeName(clauseIndex, e.target.value)} 
          value={clauseGroup.name} 
          placeholder="clause title" />
      </div> {console.log(11, currentMutation)}
      <div class="col-12 mb-2">
        <button class="btn mr-2" onClick={() => clauseActions.remove(clauseIndex)}>
          remove this clause
        </button>
        <button class="btn mr-2" onClick={() => mutateActions.denormalize(clauseIndex)}>
          {currentMutation === clauseIndex ? 'hide mutations' : 'view mutations'}
        </button>
        <button class="btn mr-2" onClick={() => queryActions.add(clauseIndex)}>
          add a query
        </button>
        <button class="btn mr-2" onClick={() => mutateActions.add(clauseIndex)}>
          add a mutation
        </button>
      </div>
      <div class="col-12 m-0 p-0">
        {clauseGroup.queries && clauseGroup.queries.map((clause, ruleIndex, {length}) => (
          <Clause 
            type="QUERY"
            clause={clause} 
            isLast={ruleIndex === length - 1} 
            clauseIndex={clauseIndex} 
            ruleIndex={ruleIndex} 
            key={`q-${clauseIndex}-${ruleIndex}`} />
        ))}
        {clauseGroup.mutations && clauseGroup.mutations.map((clause, ruleIndex, {length}) => (
          <Clause 
            type="MUTATION"
            clause={clause} 
            isLast={ruleIndex === length - 1} 
            clauseIndex={clauseIndex} 
            ruleIndex={ruleIndex} 
            key={`m-${clauseIndex}-${ruleIndex}`} />
        ))}
      </div>
    </div>
  </div>
)

const MinifiedClause = () => ({})

const Builder = (props) => (
  <div class="row px-4 py-3">
    <div class="col-12 p-0 mb-3">
      <button style={btnStyle} class="btn p-2 mr-2" onClick={props.clauseActions.add}>
        add clause <i class="fa fa-plus"></i>
      </button>
      <button style={btnStyle} class="btn p-2 mr-2" onClick={props.clauseActions.removeAll}>
        remove all clauses
      </button>
      <button style={btnStyle} class="btn p-2 mr-2">
        view all mutations
      </button>
    </div>
    {props.clauses.map((clauseGroup, clauseIndex) => (
      clauseGroup.minimized === false 
        ? <MaximizedClause key={clauseIndex} clauseIndex={clauseIndex} clauseGroup={clauseGroup} {...props} />
        : <MaximizedClause key={clauseIndex} clauseIndex={clauseIndex} clauseGroup={clauseGroup} {...props} />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  ...state,
  currentMutation: state.slave.currentMutation
})

const mapDispatchToProps = (dispatch) => ({
  queryActions: bindActionCreators(queryActions, dispatch),
  mutateActions: bindActionCreators(mutateActions, dispatch),
  clauseActions: bindActionCreators(clauseActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Builder)