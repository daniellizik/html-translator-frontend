import React, { Component, PropTypes } from 'react'
import RCToolTip from 'rc-tooltip'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as onboardActions from '~/src/containers/onboarder/actions'

const overlayStyle = {
  backgroundColor: '#b1b1b1',
  maxWidth: '350px',
  color: 'black',
  zIndex: 15,
  opacity: 1
}

const boundOnboardActions = (dispatch) => bindActionCreators(onboardActions, dispatch)

export const ToolTip = ({overlayClassName, placement, destroyTooltipOnHide, visible, overlay, children}) => (
  <RCToolTip 
    placement={placement}
    destroyTooltipOnHide={destroyTooltipOnHide}
    visible={visible}
    overlay={overlay}
    overlayClassName={overlayClassName}
    overlayStyle={overlayStyle}>
    {children}
  </RCToolTip>
)

export class FadingToolTip extends Component {
  static PropTypes: {
    placement: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    fade: PropTypes.number.isRequired,
    overlay: PropTypes.object.isRequired
  }
  constructor() {
    super()
    this.state = { visible: false }
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState(() => ({visible: true}))
    }, this.props.fade)
  }
  render() {
    if (!this.state.visible)
      return this.props.children
    return (
      <RCToolTip 
        placement={this.props.placement}
        destroyTooltipOnHide={true}
        visible={this.props.visible}
        overlay={this.props.overlay(this.state)}
        overlayClassName={this.props.overlayClassName}
        overlayStyle={overlayStyle}>
        {this.props.children}
      </RCToolTip>
    )
  }
}

export const AddSourceExplanation = () => (
  <div>
    Here you can import your html from a variety of sources. For now we'll use a sample email to work with.
  </div>
)

export const ChangeHtmlExplanation = () => (
  <div>
    Use the "change html" button to import the html you want to translate
  </div>
)

export const AddClauseExplanation = () => (
  <div>
    <p>
      A "clause" is a group of queries and mutations. These are the blocks you use with which to find and replace certain parts of your html document. 
    </p>      
    <p class="mt-1">
      Try to add a clause by clicking on the button!
    </p>
  </div>
)

export const ChangeTargetExplanation = connect(s => s, boundOnboardActions)(({step_4}) => (
  <div>
    <p>
      The "target" indicates which part of a html tag you want to search for.
    </p>
    <ul>
      <li>"Node name" is the name of a html tag</li>
      <li>"Text" is the inner text of a html tag</li>
      <li>"Attribute key" is the name of any attribute on a html tag</li>
      <li>"Attribute value" is the value of a html tag</li>
    </ul>
    <p onClick={step_4}>next</p>
  </div>
))

export const AddQueryExplanation = () => (
  <div>
    <p>
      In order to query your html document, we need to add queries that describe what to search for.
    </p>
    <p>
      Click on the "add a query" button to add a query.
    </p>
  </div>
)

export const ChangeQueryRuleExplanation = connect(s => s, boundOnboardActions)(({step_6}) => (
  <div>
    <p>You can change the search rule of each query.</p>
    <ul>
      <li>Equals and not equals will search for an exact match.</li>
      <li>Like and not like search for smaller matches within strings.</li>
    </ul>
    <p onClick={step_6}>next</p>
  </div>
))

export const ChangeQueryTargetValueExplanation = () => (
  <div>
    <p>Use this input to change the value of the search quer.y</p>
    <p>Try changing the input to find a result.</p>
  </div>
)

export const XmlTreeExplanation = ({index}) => (
  <div>
    {
      index < 1 
        ? 'The html tags that have been found the by the query will be highlighted here'
        : '...and here'
    }
  </div>  
)

export const AddMutationExplanation = () => (
  <div>
    <p>Now let's add a mutation, by clicking this button.</p>
  </div>
)

export const ChangeMutationRuleExplanation = connect(s => s, boundOnboardActions)(({step_9}) => (
  <div>
    <p>Change how the selected html elements are mutated. There are several rules to choose from:</p>
    <ul>
      <li>replace all: replace the entire target</li>
      <li>start of: append text to the beginning of the target</li>
      <li>end of: append text to the end of the target</li>
      <li>regex replace: use javascript regex to replace parts of the target</li>
    </ul>
    <p onClick={step_9}>next</p>
  </div>
))

export const ChangeMutationRuleValueExplanation = () => (
  <div>
    <p>This input controls what your mutation will result in.</p>
  </div>
)

export const ViewMutationsExplanation = () => (
  <div>
    <p>To view the mutations of the current clause click this button</p>
  </div>
)
