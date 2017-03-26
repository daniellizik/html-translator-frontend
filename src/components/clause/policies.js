import React from 'react'
import {
  TargetSetter,
  TargetValueSetter,
  RuleSetter,
  RegexBodySetter,
  RegexFlagsSetter,
  AttrKeySetter,
  AttrValSetter,
  AddAttrSetter,
  AddAttrMutator,
  RemoveAttrByKeyMutator,
  RemoveAttrByValueMutator,
  RemoveAllAttrsMutator
} from './clauses'

/**
 * policy
 * @prop {array<string>} target - refers to html AST node property
 * @prop {array<string>} rules - refers to homebrew rules, see ~/src/components/clause/rules
 * @prop {function} structure - structure to render if target and rules pass
 */

export default [
  {
    target: ['text'], 
    rules: ['equals', 'notEquals', 'like', 'notLike'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['text'],
    rules: ['regex'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
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
    target: ['text'],
    rules: ['startOf', 'endOf', 'allReplace'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
        </div>
        <div class="col-12">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['text'],
    rules: ['regexReplace'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
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
    target: ['nodeName'],
    rules: ['equals', 'notEquals', 'like', 'notLike'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['nodeName'],
    rules: ['regex'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['attrKey'],
    rules: ['equals', 'notEquals', 'like', 'notLike'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['attrKey'],
    rules: ['regex'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
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
    target: ['attrVal'],
    rules: ['equals', 'notEquals', 'like', 'notLike'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['attrVal'],
    rules: ['regex'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
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
    target: ['nodeName'],
    rules: ['startOf', 'endOf', 'allReplace'],
    structure: (props) => (
    <div class="row pt-2 m-0">
      <div class="col-6">
        <TargetSetter {...props} />
      </div>
      <div class="col-6">
        <RuleSetter {...props} />
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
    target: ['nodeName'],
    rules: ['regexReplace'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
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
    target: ['attrKey'],
    rules: ['startOf', 'endOf', 'allReplace'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <RuleSetter {...props} />
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
    target: ['attrKey'],
    rules: ['regexReplace'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
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
    target: ['attrVal'],
    rules: ['startOf', 'endOf', 'allReplace'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <AttrValSetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <TargetValueSetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RuleSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['attrVal'],
    rules: ['regexReplace'],
    structure: (props) => (
      <div class="row pt-2 m-0 form-group">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
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
  }
]