import React, { Component, PropTypes } from 'react'
import XmlTag, { findTagType } from './xmlTag'
import { connect } from 'react-redux'
import { mutateList } from '~/src/util'
import { bindActionCreators } from 'redux'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'

// todo: move this to reducer using slave.view
// similar to denormalize mutations, it needs to denormalize the whole list
// not just open tags
const setView = (props) => {
  if (props.clauses[props.activeClause] && props.slave.currentMutation < 0)
    return mutateList(
      props.list.list, 
      props.clauses[props.activeClause].view
    )
  else if (props.clauses.length > 0 && props.activeClause > -1)
    return mutateList(
      props.slave.mutated, 
      props.clauses[props.activeClause].view
    )
  else if (props.activeClause === -1)
    return mutateList(
      props.slave.mutated,
      props.clauses.reduce((a, c) => {
        return [...a, ...c.view.reduce((b, n) => {
          return a.includes(n) ? b : [...b, n]
        }, [])]
      }, [])
    )
  else
    return mutateList(
      props.list.list, 
      []
    )
}

// the weird thing with this is that 
// we dont want to render empty text nodes, even though
// they are part of the list. doing so would cause the code line numbers
// to be all messed up, like they skip lines
// so to only render what we want we need to look at the data
// the component renders...before it is rendered
// feels weird.

const mapDispatchToProps = (dispatch) => ({
  queryActions: bindActionCreators(queryActions, dispatch),
  mutateActions: bindActionCreators(mutateActions, dispatch),
  clauseActions: bindActionCreators(clauseActions, dispatch)
})

const mapStateToProps = (state) => ({
  ...state,
  list: state.slave.list,
  view: state.slave.view
})

const XmlTree = ({list, view, callbacks}) => (
  <table style={{width: '100%'}}>
    <tbody>
      {view.reduce((acc, node, i, list) => {
        const tagType = findTagType({node, list}) 
        return !tagType ? acc : {
          count: acc.count + 1,
          tags: [
            ...acc.tags,
            <XmlTag
              key={i}
              node={node}
              index={i}
              row={acc.count}
              openTags={list.open}
              list={list}
              tagType={tagType}
              callbacks={callbacks} />
          ]
        }
      }, {tags: [], count: 0}).tags}
    </tbody>
  </table>
)

export default connect(mapStateToProps, mapDispatchToProps)(XmlTree)