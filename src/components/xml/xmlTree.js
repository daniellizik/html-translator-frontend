import React, { Component, PropTypes } from 'react'
import XmlTag from './xmlTag'

export default class XmlTree extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    list: PropTypes.array
  }
  render() {
    const { list } = this.props
    if (list.length < 1)
      return null
    else {
      const view = list.reduce((acc, node, i, arr) => {
        // this is weird as shit
        const tokens = XmlTag.shouldIgnore(acc, node, i, arr)
        if (!tokens)
          return acc
        else
          return {
            count: acc.count + 1,
            tags: [
              ...acc.tags,
              <XmlTag
                key={i}
                node={node}
                index={i}
                row={acc.count}
                arr={arr}
                tokens={tokens}
                callbacks={this.props.callbacks} />
            ]
          }
      }, {tags: [], count: 0}).tags
      return (
        <table>
          <tbody>
            {view}
          </tbody>
        </table>
      )
    }
  }
}
