import React from 'react'
import queryPolicies from '~/src/components/policies/queryPolicies'
import mutationPolicies from '~/src/components/policies/mutationPolicies'

export default (props) => (props.type === 'QUERY' ? queryPolicies : mutationPolicies).reduce((acc, policy, i, {length}) => {
  const isValidTarget = (policy.target || []).includes(props.clause.target)
  const isValidRule = (policy.rules || []).includes(props.clause.rule)
  const Structure = policy.structure
  if (props.type === 'QUERY')
    return isValidTarget && isValidRule ? [...acc, <Structure key={i} {...props} />] : acc
  if (props.type === 'MUTATION')
    return isValidRule ? [...acc, <Structure key={i} {...props} />] : acc
}, [])