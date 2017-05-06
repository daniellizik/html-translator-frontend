import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import XmlTree from '~/src/components/xml/xmlTree'

class HtmlMount extends Component {

  hover({node, row}) {

  }

  click({node, row}) {
    console.log(node)
  }

  render() {
    return this.props.slave.list.length < 1 
      ? (<div></div>) 
      : (
        <div class="row">
          <XmlTree callbacks={{hover: this.hover.bind(this), click: this.click.bind(this)}} />
        </div>
      )
  }

}

export default connect(s => s)(HtmlMount)