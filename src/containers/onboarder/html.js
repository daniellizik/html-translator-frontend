import React from 'react'

export default ({hello, site, email}) => (
  <table class="m-2 p-0">
    <tbody>
      <tr class="pt-1" data-row="0">
        <td class="f-monospace fs-p-14 no-wrap">
          <span></span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_NODENAME">html</span><span class="syntax_CLOSE_TAG">&gt;</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="1">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_NODENAME">head</span><span class="syntax_CLOSE_TAG">&gt;</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="2">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_NODENAME">title</span><span class="syntax_CLOSE_TAG">&gt;</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="3">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span class="syntax_TEXT">{email}</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="4">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_SLASH">/</span><span class="syntax_NODENAME">title</span><span class="syntax_CLOSE_TAG">&gt;</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="5">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_SLASH">/</span><span class="syntax_NODENAME">head</span><span class="syntax_CLOSE_TAG">&gt;</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="6">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_NODENAME">body</span><span class="syntax_CLOSE_TAG">&gt;</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="7">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_NODENAME">input</span> <span class="syntax_SPACER"></span><span class="syntax_SLASH">/</span><span class="syntax_CLOSE_TAG">&gt;</span></span>
        </td>
      </tr>
      <tr class="pt-1" data-row="8">
        <td class="f-monospace fs-p-14 no-wrap">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span class="syntax_OPEN_TAG">&lt;</span>
          <span class="syntax_NODENAME">h2</span>
          <span class="syntax_SPACER"> </span>
          <span class="syntax_ATTR_NAME">data-redirect</span>
          <span class="syntax_ATTR_SETTER">=</span>
          <span class="syntax_ATTR_QUOTE_OPEN">"</span>
          <span class="syntax_ATTR_VALUE">{site}</span>
          <span class="syntax_ATTR_QUOTE_CLOSE">"</span> 
          <span class="syntax_CLOSE_TAG">&gt;</span>
        </td>
      </tr>
      <tr class="pt-1" data-row="9">
        <td class="f-monospace fs-p-14 no-wrap"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span class="syntax_TEXT_NODE">{hello}</span></span></td>
      </tr>
      <tr class="pt-1" data-row="10">
        <td class="f-monospace fs-p-14 no-wrap"><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_SLASH">/</span><span class="syntax_NODENAME">h2</span><span class="syntax_CLOSE_TAG">&gt;</span></span></td>
      </tr>
      <tr class="pt-1" data-row="11">
        <td class="f-monospace fs-p-14 no-wrap"><span>&nbsp;&nbsp;</span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_SLASH">/</span><span class="syntax_NODENAME">body</span><span class="syntax_CLOSE_TAG">&gt;</span></span></td>
      </tr>
      <tr class="pt-1" data-row="13">
        <td class="f-monospace fs-p-14 no-wrap"><span></span><span><span class="syntax_OPEN_TAG">&lt;</span><span class="syntax_SLASH">/</span><span class="syntax_NODENAME">html</span><span class="syntax_CLOSE_TAG">&gt;</span></span></td>
      </tr>
    </tbody>
  </table>
)
