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
  return (type.indexOf('@CLAUSE') > -1 || type === HTML_FETCHED) ? {
    ...state,
    slave: {
      ...state.slave,
      xml: (state.slave.view.length < 1 ? state.slave.list.list : state.slave.view).reduce((acc, node, i, list) => {
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
  } : state
}