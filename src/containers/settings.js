import React, { Component } from 'react'
import { connect } from 'react-redux'

class Settings extends Component {
  constructor() {
    super()
  }
  componentDidMount() {

  }
  render() {
    return !this.props.viewing ? null : (
      <div class="container-fluid max p-0 m-0">
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  viewing: state.user.viewingSettings
})

export default connect(mapStateToProps)(Settings)