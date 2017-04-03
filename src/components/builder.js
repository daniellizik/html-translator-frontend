import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { startEditor, addClause } from '~/src/components/clause/actions'
import { colors } from '~/src/styles/constants'
import styles from '~/src/styles'
import Clause from '~/src/components/clause/clause'
import * as actions from '~/src/components/clause/actions'

const style = (hasView) => ({
  backgroundColor: hasView ? colors.success : colors.inactive
})

const clauseStyle = {
  background: colors.grey
}

const btnStyle = {
  backgroundColor: colors.lightYellow
}

const MaximizedClause = ({removeClause, addQuery, activateClause, changeClauseName, clauseIndex, clauseGroup}) => (
  <div
    onClick={() => activateClause(clauseIndex)}
    key={clauseIndex} 
    class="col-12 mx-0 my-2 py-3" 
    style={clauseStyle}>
    <div class="row">
      <div class="col-12 mb-2">
        <input 
          type="text"
          class="form-control"
          onChange={(e) => changeClauseName(clauseIndex, e.target.value)} 
          value={clauseGroup.name} 
          placeholder="clause title" />
      </div>
      <div class="col-12 mb-2">
        <button class="btn mr-2" onClick={() => removeClause(clauseIndex)}>
          remove this clause
        </button>
        <button class="btn mr-2" onClick={() => addQuery(clauseIndex)}>
          add a query
        </button>
        <button class="btn"> 
          minimize
        </button>
      </div>
      <div class="col-12 m-0 p-0">
        {clauseGroup.rules.map((clause, queryIndex, {length}) => (
          <Clause 
            clause={clause} 
            isLastQuery={queryIndex === length - 1} 
            clauseIndex={clauseIndex} 
            queryIndex={queryIndex} 
            key={`${clauseIndex}-${queryIndex}`} />
        ))}
      </div>
    </div>
  </div>
)

const MinifiedClause = () => ({})

const Builder = (props) => (
  <div class="row px-4 py-3">
    <div class="col-12 p-0 mb-3">
      <button style={btnStyle} class="btn p-2 mr-2" onClick={() => props.addClause()}>
        add clause <i class="fa fa-plus"></i>
      </button>
      <button style={btnStyle} class="btn p-2 mr-2" onClick={props.removeAllClauses}>
        remove all clauses
      </button>
    </div>
    {props.clauses.map((clauseGroup, clauseIndex) => (
      clauseGroup.minimized === false 
        ? <MaximizedClause key={clauseIndex} clauseIndex={clauseIndex} clauseGroup={clauseGroup} {...props} />
        : <MaximizedClause key={clauseIndex} clauseIndex={clauseIndex} clauseGroup={clauseGroup} {...props} />
    ))}
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  removeAllClauses: () => dispatch(actions.removeAllClauses()),
  activateClause: (i) => dispatch(actions.activateClause(i)),
  addQuery: (...args) => dispatch(actions.addQuery(...args)),
  changeClauseName: (...args) => dispatch(actions.changeClauseName(...args)),
  removeClause: (...args) => dispatch(actions.removeClause(...args)),
  pushRoute: (...args) => dispatch(startEditor(...args)),
  addClause: () => dispatch(addClause()),
})

export default connect(s => s, mapDispatchToProps)(Builder)