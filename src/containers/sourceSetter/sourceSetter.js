import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import { ToolTip, AddSourceExplanation } from '~/src/components/explanation'

const Checkmark = ({active}) => (
  <i class={`fa fa-check ${active ? 'c-success' : 'transparent'}`}></i>
)

class SourceSetter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dragging: false
    }
  }

  preventer({preventDefault}) {
    preventDefault()
    return false
  }

  dropHandle(e) {
    const file = e.dataTransfer.files[0]
    this.props.fileSelect(file)
    e.preventDefault()
    return false
  }

  dragOverHandle(e) {
    e.preventDefault()
    return false
  }

  dragEnterHandle(e) {
    this.setState((state) => ({ dragging: true }))
    e.preventDefault()
    return false
  }

  submit(e) {
    e.preventDefault()
    return false
  }

  render() {
    const { lastModified, name, html, url, file } = this.props.source
    return (
      <form onSubmit={this.submit} class="row justify-content-center h-0">
        <div
          class={`col-6 mt-5 z-15 ${this.props.source.active ? 'visible' : 'hidden'}`}>
          <div class="row">
            <div 
              onDragOver={this.dragOverHandle.bind(this)}
              onDrop={this.dropHandle.bind(this)}
              onDragEnter={this.dragEnterHandle.bind(this)} 
              class="rounded py-3 px-4 col-12 bg-main z-15">

              <div class="row p-2">
                <span class="label p-0 col-12">
                  fetch html from url
                  <Checkmark active={lastModified === 'url'}/>
                </span>
                <input
                  class="form-control col-12 p-1 f-monospace"
                  onChange={(e) => this.props.urlChange(e.target.value)}
                  value={this.props.source.url || ''}
                  type="text" />
              </div>

              <div class="row p-2">
                <div class={`col-12 rounded m-0 p-0 ${this.state.dragging ? 'b2-d-highlight' : 'b2-d-altMain'}`}>
                  <div class="row p-0 m-0">
                    <div class="col-8 p-2">
                      <span>
                        drag and drop html file
                        <Checkmark active={lastModified === 'file'}/>
                      </span>
                    </div>
                    <div class="col-4 p-0">
                      <input 
                        onChange={(e) => this.props.fileSelect(e.target.files[0])}
                        type="file"
                        class="custom-file-input col-4 p-0">
                      </input>
                      <span class="ta-c custom-file-control">or select file</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row p-2">
                <div class="col-12 p-0">
                  {name}
                </div>
              </div>

              <div class="row p-2">
                <span class="col-12 p-0">
                  use raw html
                  <Checkmark active={lastModified === 'html'}/>
                </span>
                <textarea
                  onChange={(e) => this.props.htmlRawChange(e.target.value)}
                  value={this.props.source.rawHtml || ''}
                  class="form-control col-12 p-2 f-monospace h-100">
                </textarea>
              </div>

              <div class="row p-2">
                <div class="col-12 p-0">
                <ToolTip
                  placement="bottomLeft"
                  destroyTooltipOnHide={true}
                  visible={this.props.onboarding.step === 2}
                  overlay={<AddSourceExplanation />}>
                  <button 
                    class={`btn mr-3 ${!html && !url && !file ? '' : 'btn-success'}`} 
                    onClick={() => this.props.submit(this.props.source)}>submit</button>
                </ToolTip>
                  <button class="btn" onClick={() => this.props.dismiss()}>cancel</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    )

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(s => s, mapDispatchToProps)(SourceSetter)
