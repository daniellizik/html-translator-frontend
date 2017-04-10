import React from 'react'
import queryPolicies from '~/src/components/clause/policies/queryPolicies'
import mutationPolicies from '~/src/components/clause/policies/mutationPolicies'

export default (props) => ({QUERY: queryPolicies, MUTATION: mutationPolicies})[props.type].reduce((acc, policy, i, {length}) => {
  const isValidTarget = (policy.targets || []).includes(props.clause.target)
  const isValidRule = (policy.rules || []).includes(props.clause.rule)
  const Structure = policy.structure
  return isValidTarget && isValidRule ? [...acc, <Structure key={i} {...props} />] : acc
}, [])