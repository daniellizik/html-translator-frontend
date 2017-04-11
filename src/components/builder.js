import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '~/src/styles/constants'
import styles from '~/src/styles'
import Clause from '~/src/components/clause/clause'
import { queryActions, mutateActions, clauseActions, builderActions } from '~/src/components/clause/actions/index'
import * as config from '~/src/components/clause/settings/config'


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

const MaximizedClause = ({ target, currentMutation, clauseActions, queryActions, mutateActions, clauseIndex, clauseGroup }) => (
  <div
    key={clauseIndex} 
    class="col-12 mx-0 mb-3 py-3" 
    style={clauseStyle}>
    <div class="row">
      <label class="col-6 mb-2">
        <p>change target</p>
        <select 
          class="form-control custom-select" 
          value={target}
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
        <button class="btn mr-2" onClick={() => clauseActions.remove(clauseIndex)}>
          remove this clause
        </button>
        <button class="btn mr-2" onClick={() => mutateActions.denormalize(currentMutation === clauseIndex ? -1 : clauseIndex)}>
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
  <div class="row pl-4 px-3 py-3">
    <div class="col-12 p-0 mb-3">
      <button style={btnStyle} class="btn p-2 mr-2" onClick={props.clauseActions.add}>
        add clause <i class="fa fa-plus"></i>
      </button>
      <button style={btnStyle} class="btn p-2 mr-2" onClick={props.builderActions.removeAll}>
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
  clauseActions: bindActionCreators(clauseActions, dispatch),
  builderActions: bindActionCreators(builderActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Builder)