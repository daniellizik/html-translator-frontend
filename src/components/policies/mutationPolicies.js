import React from 'react'
import {
  TargetSetter,
  TargetValueSetter,
  ChangeRule,
  RegexBodySetter,
  RegexFlagsSetter,
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
    rules: ['START_OF', 'END_OF', 'ALL_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-12"> 
          <ChangeRule {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    rules: ['REGEX_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-12">
          <ChangeRule {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
      </div>
    )
  },
  /*{
    rules: ['START_OF', 'END_OF', 'ALL_REPLACE'],
    structure: (props) => (
    <div class="row pt-2 m-0">
      <div class="col-6">
        <ChangeRule {...props} />
      </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
    </div>
    )
  },
  {
    rules: ['REGEX_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
      </div>
    )
  },
  {
    rules: ['REGEX_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <AttrKeySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
      </div>
    )
  },
  {
    rules: ['START_OF', 'END_OF', 'ALL_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <AttrValSetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <TargetValueSetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <ChangeRule {...props} />
        </div>
      </div>
    )
  },
  {
    rules: ['REGEX_REPLACE'],
    structure: (props) => (
      <div class="row pt-2 m-0 form-group">
        <div class="col-6">
          <AttrValSetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
      </div>
    )
  }*/
]