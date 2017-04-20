import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import strings from './strings.json'
import { colors } from '~/src/styles/constants'
import Overlay, { dismissModal } from '~/src/containers/overlay'

const style = {
  container: ({visible}) => ({
    zIndex: 12,
    position: 'fixed',
    display: visible === false ? 'none' : 'initial'
  }),
  modal: {
    background: 'white'
  },
  input: {
    fontFamily: `"Source Code Pro", "Space Mono", "Inconsolata", "Liberation Mono", "Menlo", "Courier", monospace`
  },
  dnd: (active) => ({
    padding: '1px',
    border: active ? `2px dashed ${colors.success}` : `2px dashed ${colors.light}`
  }),
  submit: ({html, url, file}) => {
    if (!html && !url && !file)
      return 'btn mr-3'
    else
      return 'btn btn-success mr-3'
  },
  checkmark: (active) => ({
    color: active ? colors.success : 'transparent'
  })
}

const Checkmark = ({active}) => (
  <i style={style.checkmark(active)} class="fa fa-check"></i>
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

  guts() {
    const { lastModified, name } = this.props.source
    return (
      <div class="row">
        <div 
          onDragOver={this.dragOverHandle.bind(this)}
          onDrop={this.dropHandle.bind(this)}
          onDragEnter={this.dragEnterHandle.bind(this)} 
          style={style.modal} 
          class="rounded py-3 px-4 col-6 offset-3">

          <div class="row p-2">
            <span class="label p-0 col-12">
              fetch html from url
              <Checkmark active={lastModified === 'url'}/>
            </span>
            <input
              style={style.input}            
              class="form-control col-12 p-1"
              onChange={(e) => this.props.urlChange(e.target.value)}
              value={this.props.source.url || ''}
              type="text" />
          </div>

          <div class="row p-2">
            <div class="col-12 rounded" style={style.dnd(this.state.dragging)}>
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
                  <span class="btn custom-file-control">or select file</span>
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
              style={style.input}
              onChange={(e) => this.props.htmlRawChange(e.target.value)}
              value={this.props.source.rawHtml || ''}
              class="form-control col-12 p-2"></textarea>
          </div>

          <div class="row p-2">
            <div class="col-12 p-0">
              <button class={style.submit(this.props.source)} onClick={() => this.props.sourceSubmit(this.props.source)}>submit</button>
              <button class="btn" onClick={() => this.props.dismissModal()}>cancel</button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  render() {
    const { visibility } = this.props.source.visible
    if (visibility === false)
      return null
    return (
      <div class="row">
        <Overlay />
        <div
          style={style.container(this.props.source)}
          class="col-12 mt-5">
          {this.guts()}
        </div>
      </div>
    )

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...actions,
  dismissModal
}, dispatch)

export default connect(s => s, mapDispatchToProps)(SourceSetter)
