import React from 'react'

/** pure select component
 * @prop {string} value
 * @prop {array<string>} rules
 * @prop {number} clauseIndex
 * @prop {number} ruleIndex
 * @prop {function} onFocus
 * @prop {function} onChange
 */
export const Choice = ({
  value = '',
  options = [],
  onFocus,
  onChange,
  clauseIndex,
  ruleIndex
}) => (
  <select 
    class="form-control custom-select"
    value={value} 
    onFocus={onFocus}
    onChange={onChange}>
    {options.map((r, i) => (
      <option value={r} key={i}>
        {r}
      </option>
    ))}
  </select>
)

/** pure text component
 * @prop {string} value
 * @prop {number} clauseIndex
 * @prop {number} ruleIndex
 * @prop {function} onFocus
 * @prop {function} onChange
 */
export const Text = ({
  value = '', 
  clauseIndex, 
  ruleIndex, 
  onFocus, 
  onChange
}) => (
  <input 
    type="text"
    class="form-control"
    value={value} 
    onFocus={onFocus}
    onChange={onChange} />
)

/** pure button group
 * @prop {string}
 * @prop {string}
 * @prop {string}
 * @prop {string}
 * @prop {string}
 */
export const ButtonGroup = () => (
  <div>

  </div>
)