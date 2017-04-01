import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Radium from 'radium'
import { colors } from '~/src/styles/constants'
import XmlTree from '~/src/components/xml/xmlTree'

const style = {
  border: `1px solid ${colors.light}`,
  overflowX: 'scroll'
}

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
        <div style={style} class="rounded pl-1 m-0">
          <XmlTree callbacks={this.callbacks()} list={list}/>
        </div>
      )
    }
  }

}



const mapDispatchToProps = (dispatch) => ({
  
})

const withRadium = Radium(Receiver)
const withConnect = connect(s => s, mapDispatchToProps)(withRadium)
export default withConnect
