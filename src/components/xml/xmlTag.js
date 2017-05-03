import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import XmlToken from './xmlToken'
import XmlSpacer from './xmlSpacer'
import { ToolTip, FadingToolTip, XmlTreeExplanation } from '~/src/components/explanation'
import settings from '~/src/settings.json'

const XmlTd = (props) => (
  <td 
    class={`f-monospace fs-p-14 no-wrap ${props.node.viewed ? 'bg-dbg' : ''}`}>
    <XmlSpacer depth={props.node.depth} />
    <XmlToken 
      tokens={props.tokens}
      key={props.index} 
      node={props.node} />
  </td>
)

const XmlTag = (props) => (
  <tr
    data-row={props.row}
    data-id={props.node.id}
    class="pt-1"
    onClick={() => props.callbacks.click(props)}
    onMouseEnter={(e) => props.callbacks.hover(props)}>
    <td 
      class="code-line f-monospace pr-2 c-inactive no-select ta-r mouse-point" 
      data-line-number={props.row}>
    </td>
    {props.onboarding.step === 8 && props.node.viewIndex < settings.onboarding_fade_max ? (
      <FadingToolTip
        placement="topLeft"
        overlay={({visible}) => <XmlTreeExplanation index={props.node.viewIndex} visible={visible} />}
        fade={(props.node.viewIndex + 1) * settings.onboarding_fade_delay}
        visible={props.onboarding.step === 8 && props.node.viewIndex < 3}>
        <XmlTd {...props} />
      </FadingToolTip>
    ) : (
      <XmlTd {...props} />
    )}
  </tr>
)

XmlTag.propTypes = {
  node: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  tokens: PropTypes.array.isRequired,
  callbacks: PropTypes.object.isRequired,
}

const withConnect = connect(s => s)(XmlTag)

export default withConnect
