import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import XmlTree from '~/src/components/xml/xmlTree'

class Receiver extends Component {

  constructor() {
    super()
    this.state = {
      encapsulated: null,
      row: null
    }
  }

  callbacks() {
    return {
      highlight: ({node, row}) => {
        // this.setState({ row: node.len, encapsulated: node.id })
      },
      click: ({node, row}) => {
        //console.log(node)
      }
    }
  }

  render() {
    const { list } = this.props.slave
    if (!list || list.length < 1)
      return (<div></div>)
    else {
      return (
        <div class="row">
          <XmlTree callbacks={this.callbacks()} />
        </div>
      )
    }
  }

}



const mapDispatchToProps = (dispatch) => ({
  
})

const withConnect = connect(s => s, mapDispatchToProps)(Receiver)
export default withConnect
