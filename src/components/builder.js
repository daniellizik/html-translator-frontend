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

const Builder = (props) => (
  <div class="row">
    <div class="col-12 p-0 mb-3">
      <button class="btn p-2 mr-2" onClick={() => props.addClause()}>
        add clause <i class="fa fa-plus"></i>
      </button>
    </div>
    {props.clauses.map((clauseGroup, clauseIndex) => (
      <div
        onClick={() => props.activateClause(clauseIndex)}
        key={clauseIndex} 
        class="col-12 m-2 py-3" 
        style={styles.box.clause}>
        <div class="row">
          <div class="col-8 mb-3">
            <input 
              type="text"
              class="form-control"
              onChange={(e) => props.changeClauseName(clauseIndex, e.target.value)} 
              value={clauseGroup.name} 
              placeholder="clause title" />
          </div>
          <div class="col-4">
            <p onClick={() => props.removeClause(clauseIndex)}>
              remove this clause
            </p>
            <p onClick={() => props.addQuery(clauseIndex)}>
              add a query
            </p>
            <p>
              minimize
            </p>
          </div>
          <div class="col-12 m-0 p-0">
            {clauseGroup.rules.map((clause, queryIndex, {length}) => (
              <Clause clause={clause} isLastQuery={queryIndex === length - 1} clauseIndex={clauseIndex} queryIndex={queryIndex} key={`${clauseIndex}-${queryIndex}`} />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  activateClause: (i) => dispatch(actions.activateClause(i)),
  addQuery: (...args) => dispatch(actions.addQuery(...args)),
  changeClauseName: (...args) => dispatch(actions.changeClauseName(...args)),
  removeClause: (...args) => dispatch(actions.removeClause(...args)),
  pushRoute: (...args) => dispatch(startEditor(...args)),
  addClause: () => dispatch(addClause()),
})

export default connect(s => s, mapDispatchToProps)(Builder)