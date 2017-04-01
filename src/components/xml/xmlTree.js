import React, { Component, PropTypes } from 'react'
import XmlTag, { findTagType } from './xmlTag'
import { generate as id } from 'shortid'

// the weird thing with this is that 
// we dont want to render empty text nodes, even though
// they are part of the list. doing so would cause the code line numbers
// to be all messed up, like they skip lines
// so to only render what we want we need to look at the data
// the component renders...before it is rendered
// feels weird.

export default class XmlTree extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    list: PropTypes.object
  }
  // todo:
  // get active clause, find if nodes are in view
  // do this pre-render...otherwise you get stupid n* crap
  render() {
    if (this.props.list.open.length < 1)
      return null
    return (
      <table>
        <tbody>
          {this.props.list.list.reduce((acc, node, i, list) => {
            const tagType = findTagType({node, list}) 
            return !tagType ? acc : {
              count: acc.count + 1,
              tags: [
                ...acc.tags,
                <XmlTag
                  isInView={false}
                  key={id()}
                  node={node}
                  index={i}
                  row={acc.count}
                  openTags={this.props.list.open}
                  list={list}
                  tagType={tagType}
                  callbacks={this.props.callbacks} />
              ]
            }
          }, {tags: [], count: 0}).tags}
        </tbody>
      </table>
    )
  }
}
