import React, { Component, PropTypes } from 'react'
import XmlTag, { findTagType } from './xmlTag'
import { connect } from 'react-redux'
import { mutateList } from '~/src/components/clause/reducers/util'
import { bindActionCreators } from 'redux'
import { queryActions, mutateActions, clauseActions } from '~/src/components/clause/actions/index'

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
  <div class="col-12 m-0 p-0">
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
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(XmlTree)