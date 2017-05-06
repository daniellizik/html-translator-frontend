import {
  allReplaceText,
  reducedMutations,
  regexMutation,
  toggling,
  nodename,
  chainedDenormalizations
} from '~/test/storyFixtures/mutation'
import { story as comments } from '~/test/storyFixtures/onboarding'
import T, { tokenizeAttrs } from '~/src/components/xml/tokenizer'
import { findTagType } from '~/src/components/xml/xmlReducer'

describe('find xml tag type', () => {
  it('should ignore closing void tags', () => {
    expect(findTagType({
      node: {nodeName: 'input', close: true}
    })).toBe('ignorable')
  })
  it('should respect open void tags', () => {
    const node = {nodeName: 'input', id: 0, close: false}
    expect(findTagType({
      node,
      list: [node, {nodeName: 'input', id: 0, close: true}]
    })).toBe('voided')
  })
  it('should not mistake void for ignorable', () => {
    const node = {nodeName: 'input', id: 3, close: false}
    const res = findTagType({
      node,
      list: [
        {nodeName: 'div', close: false, id: 0},
        {nodeName: 'div', close: false, id: 1}, 
        {nodeName: 'div', close: false, id: 2},
        node,
        {nodeName: 'input', close: true, id: 4},
      ]
    })
    expect(res).not.toBe('ignorable')
    expect(res).toBe('voided')
  })
  it('find close tag', () => {
    expect(findTagType({
      node: {nodeName: 'div', id: 1, close: true},
      list: [{nodeName: 'div', close: false}, {id: 0, close: true}]
    })).toBe('close')
  })
  it('find open tag', () => {
    expect(findTagType({
      node: {nodeName: 'div', id: 0, close: false},
      list: [{}, {}]
    })).toBe('open')
  })
})

describe('xml tokenizer', () => {
  describe('ignorable tags', () => {
    it('should ignore non-void tags regardless of close prop', () => {
      expect(T.ignorable.ignore({close: true, nodeName: 'div'})).toBeFalsy()
      expect(T.ignorable.ignore({close: false, nodeName: 'span'})).toBeFalsy()
    })
    it('should not ignore void-tags if they are not close: true (edge case)', () => {
      expect(T.ignorable.ignore({close: false, nodeName: 'br'})).toBeFalsy()
    })
    it('should ignore closing void tags since they are written on same line', () => {
      expect(T.ignorable.ignore({close: true, nodeName: 'br'})).toBeTruthy()
      expect(T.ignorable.ignore({close: true, nodeName: 'input'})).toBeTruthy()
    })
  })
  describe('text tags', () => {
    it('should tokenize #text tags that are not empty', () => {
      expect(T.text.ignore({nodeName: '#text', value: 'blah', close: false})).toBeTruthy()
    })
    it('should ignore empty #text tags', () => {
      expect(T.text.ignore({nodeName: '#text', value: '', close: false})).toBeFalsy()
      expect(T.text.ignore({nodeName: '#text', value: '\n', close: false})).toBeFalsy()
      expect(T.text.ignore({nodeName: '#text', value: '  \n \n', close: false})).toBeFalsy()
      expect(T.text.ignore({nodeName: '#text', value: '   ', close: false})).toBeFalsy()
    })
    it('should ignore closing #text tags', () => {
      expect(T.text.ignore({nodeName: '#text', value: '   ', close: true})).toBeFalsy()
      expect(T.text.ignore({nodeName: '#text', value: 'edge case', close: true})).toBeFalsy()
    })
  })
  describe('voided tags', () => {
    it('should ignore non-void tags', () => {
      expect(T.voided.ignore({nodeName: 'div', list: [{}, {id: 0}], id: 0})).toBeFalsy()
    })
    it('should respect void tags', () => {
      expect(T.voided.ignore({
        nodeName: 'input',
        id: 2,
        close: false,
        list: [
          {}, 
          {}, 
          {nodeName: 'input', close: false, id: 2, parent: 1}, 
          {nodeName: 'input', close: true, id: 2, parent: 1}
        ],
      })).toBeTruthy()
    })
  })
  describe('open tags', () => {
    it('should ignore close tags', () => {
      expect(T.open.ignore({close: true, nodeName: 'div' })).toBeFalsy()
    })
    it('should ignore all #text tags', () => {
      expect(T.open.ignore({close: true, nodeName: '#text' })).toBeFalsy()
      expect(T.open.ignore({close: false, nodeName: '#text' })).toBeFalsy()
    })
    it('should ignore open void tags', () => {
      expect(T.open.ignore({close: false, nodeName: 'input' })).toBeFalsy()
    })
    it('should respect open non-void tags', () => {
      expect(T.open.ignore({close: false, nodeName: 'div' })).toBeTruthy()
    })
  })
  describe('close tags', () => {
    it('should ignore open tags', () => {
      expect(T.close.ignore({close: false, nodeName: 'div'})).toBeFalsy()
    })
    it('should respect close tags', () => {
      expect(T.close.ignore({close: true, nodeName: 'div'})).toBeTruthy()
    })
    it('should ignore void close tags', () => {
      expect(T.close.ignore({close: true, nodeName: 'input'})).toBeFalsy()
    })
    it('should ignore all #text tags', () => {
      expect(T.close.ignore({close: false, nodeName: '#text'})).toBeFalsy()
      expect(T.close.ignore({close: true, nodeName: '#text'})).toBeFalsy()
    })
  })
})

describe('xml reducer', () => {
  it('must reduce an html ast node into xml token api', () => {
    chainedDenormalizations[0].slave.xml.forEach((props) => {
      expect(Array.isArray(props.tokens)).toBeTruthy()
    })
  })
  it('should render flattened ast without view if there are no clauses', () => {
    
  })
  it('should render comments as text, not a comments nodename', () => {
    
  })
})

// comments