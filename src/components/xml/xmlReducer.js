import * as clauseConstants from '~/src/components/clause/constants'
import { HTML_FETCHED } from '~/src/containers/sourceSetter/constants' 
import { bindConstantsToReducers } from '~/src/util'
import tokenizer, { tokenizeAttrs } from './tokenizer'

export const findTagType = ({node, list}) => {
  return Object
    .keys(tokenizer)
    .find(k => tokenizer[k].ignore({...node, list}))
}

// todo: put in web worker
export default function(state, {type}) {
  const isClauseAction = type.indexOf('@CLAUSE') > -1
  if (!isClauseAction)
    return state
  else if (isClauseAction || action.type === HTML_FETCHED)
    return type.indexOf('@CLAUSE') < 0 ? state : {
      ...state,
      slave: {
        ...state.slave,
        xml: state.slave.view.reduce((acc, node, i, list) => {
          const tagType = findTagType({node, list})
          return (!tagType || tagType === 'ignorable') ? acc : {
            count: acc.count + 1,
            tags: [
              ...acc.tags,
              { 
                node, 
                row: acc.count,
                tokens: tokenizer[tagType].tokens({...node, attrs: tokenizeAttrs(node.attrs)})
              }
            ]
          }
        }, {tags: [], count: 0}).tags
      }
    }
}