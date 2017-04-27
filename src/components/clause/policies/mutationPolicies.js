import React from 'react'
import { targets } from '~/src/components/clause/settings/config'
import {
  ChangeTargetValue,
  ChangeRule,
  ChangeRuleValue,
  ChangeBehavior,
  RegexBodySetter,
  ChangeRuleValueFlags,
  AttrKeySetter,
  AttrValSetter,
  AddAttrSetter,
  AddAttrMutator,
  RemoveAttrByKeyMutator,
  RemoveAttrByValueMutator,
  RemoveAllAttrsMutator
} from '~/src/components/clause/clauses'

/**
 * policy
 * @prop {array<string>} target - refers to html AST node property
 * @prop {array<string>} rules - refers to homebrew rules, see ~/src/components/clause/rules
 * @prop {function} structure - structure to render if target and rules pass
 */

export default [
  {
    targets,
    rules: ['START_OF', 'END_OF', 'ALL_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6 mt-2">
          <ChangeRuleValue {...props} />
        </div>
        <div class="col-6 mt-2"> 
          <ChangeRule {...props} />
        </div>
      </div>
    )
  },
  {
    targets,
    rules: ['REGEX_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6 mt-2">
          <ChangeTargetValue {...props} />
        </div>
        <div class="col-6 mt-2">
          <ChangeRule {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <ChangeRuleValueFlags {...props} />
        </div>
      </div>
    )
  }
]