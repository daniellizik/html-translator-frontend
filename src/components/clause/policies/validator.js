import React from 'react'
import queryPolicies from '~/src/components/clause/policies/queryPolicies'
import mutationPolicies from '~/src/components/clause/policies/mutationPolicies'

export default (props) => ({QUERY: queryPolicies, MUTATION: mutationPolicies})[props.type].reduce((acc, policy, i, {length}) => {
  const clause = props.clauses[props.clauseIndex] || {}
  const isValidTarget = (policy.targets || []).indexOf(clause.target) > -1
  const isValidRule = (policy.rules || []).indexOf(props.clause.rule) > -1
  const Structure = policy.structure
  return isValidTarget && isValidRule ? [...acc, <Structure key={i} {...props} />] : acc
}, [])