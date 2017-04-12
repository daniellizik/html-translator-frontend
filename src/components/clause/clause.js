import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '~/src/styles/constants'
import iconStyle from '~/src/styles/icon'
import policyValidator from '~/src/components/clause/policies/validator'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'
import * as config from '~/src/components/clause/settings/config'

const hrStyle = {
  borderBottom: `1px solid black`
}
const closeStyle = {
  fontSize: '.8em'
}
const clauseStyle = {
  background: colors.middleGrey,
  color: colors.white
}

const mapDispatchToProps = (dispatch) => ({
  queryActions: bindActionCreators(queryActions, dispatch),
  mutateActions: bindActionCreators(mutateActions, dispatch),
  clauseActions: bindActionCreators(clauseActions, dispatch)
})

const mapStateToProps = (state) => ({
  ...state,
  currentMutation: state.slave.currentMutation
})

export const Clause = connect(mapStateToProps, mapDispatchToProps)((props) => (
  <div class="py-0">
    <hr class="mt-1 py-0 mx-3" style={hrStyle} />
    {policyValidator(props)}
    <div class="row py-2 m-0" style={closeStyle}>
      <div class="col-4">
        <span onClick={() => ({QUERY: props.queryActions, MUTATION: props.mutateActions})[props.type].remove(props.clauseIndex, props.ruleIndex)}>
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
  clauseGroup 
}) => (
  <div
    key={clauseIndex} 
    class="col-12 mx-0 mb-3 py-3" 
    style={clauseStyle}>
    <div class="row">
      <label class="col-6 mb-2">
        <p>change target</p>
        <select 
          class="form-control custom-select" 
          value={clauseGroup.target}
          onClick={() => clauseActions.activate(clauseIndex)}
          onChange={(e) => clauseActions.changeTarget(e.target.value, clauseIndex)}>
          {config.targets.map((p, j) => (
            <option value={p} key={j}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <label class="col-6 mb-2">
        <p>clause title</p>
        <input 
          type="text"
          class="form-control"
          onClick={() => clauseActions.activate(clauseIndex)}
          onChange={(e) => clauseActions.changeName(clauseIndex, e.target.value)} 
          value={clauseGroup.name} 
          placeholder="clause title" />
      </label>
      <div class="col-12 mb-2">
        <button class="btn mr-2 my-1" onClick={() => clauseActions.remove(clauseIndex)}>
          remove this clause
        </button>
        <button class="btn mr-2 my-1" onClick={() => mutateActions.denormalize(currentMutation === clauseIndex ? -1 : clauseIndex)}>
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
))

export const MinifiedClause = connect(mapStateToProps, mapDispatchToProps)((props) => (
  null
))