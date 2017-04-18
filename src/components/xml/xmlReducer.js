import * as clauseConstants from '~/src/components/clause/constants'
import { bindConstantsToReducers } from '~/src/util'
import tokenizer, { tokenizeAttrs } from './tokenizer'

const findTagType = ({node, list}) => {
  return Object
    .keys(tokenizer)
    .find(k => tokenizer[k].ignore({...node, list}))
}

export default function(state, {type}) {
  return type.indexOf('@CLAUSE') < 0 ? state : {
    ...state,
    slave: {
      ...state.slave,
      xml: state.slave.view.reduce((acc, node, i, list) => {
        const tagType = findTagType({node, list}) 
        return !tagType ? acc : {
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