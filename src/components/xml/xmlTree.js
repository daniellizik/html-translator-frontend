import React, { Component, PropTypes } from 'react'
import XmlTag, { findTagType } from './xmlTag'
import { connect } from 'react-redux'
import { mutateList } from '~/src/util'


// similar to denormalize mutations, it needs to denormalize the whole list
// not just open tags
const setView = (props) => {
  console.log('wtf', props.activeClause)
  if (props.clauses[props.activeClause] && props.slave.currentMutation < 0)
    return mutateList(props.list.list, props.clauses[props.activeClause].view)
  else if (props.clauses.length > 0)
    return mutateList(props.slave.mutated, props.clauses[props.activeClause].view)
  else
    return mutateList(props.list.list, [])
}

// the weird thing with this is that 
// we dont want to render empty text nodes, even though
// they are part of the list. doing so would cause the code line numbers
// to be all messed up, like they skip lines
// so to only render what we want we need to look at the data
// the component renders...before it is rendered
// feels weird.

const XmlTree = (props) => (
  <table style={{width: '100%'}}>
    <tbody>
      {setView(props).reduce((acc, node, i, list) => {
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
              openTags={props.list.open}
              list={list}
              tagType={tagType}
              callbacks={props.callbacks} />
          ]
        }
      }, {tags: [], count: 0}).tags}
    </tbody>
  </table>
)

XmlTree.propTypes = {
  callbacks: PropTypes.object,
  list: PropTypes.object
}

export default connect(s => s)(XmlTree)