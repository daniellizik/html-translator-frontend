import * as rules from '~/src/components/clause/rules'

describe('querybuilder clause rules', () => {

  describe('equals', () => {
    it('should return equals test', () => {
      expect(rules.equals({ before: 1, targetValue: 1 })).toBeTruthy()
      expect(rules.equals({ before: 0 })).toBeFalsy()
      expect(rules.equals({ before: null })).toBeFalsy()
    })
  })

  describe('not equals', () => {
    it('should return not equals test', () => {
      expect(rules.notEquals({ before: 1, targetValue: 1 })).toBeFalsy()
      expect(rules.notEquals({ before: 0, targetValue: undefined })).toBeFalsy()
      expect(rules.notEquals({ before: null, targetValue: undefined })).toBeFalsy()
      expect(rules.notEquals({ before: null, targetValue: 'a' })).toBeFalsy()
    })
  })

  describe('like', () => {
    it('should return like test', () => {
      expect(rules.like({ before: 'ab', targetValue: 'ABDEFF' })).toBeFalsy()
      expect(rules.like({ before: 'cat burrito' })).toBeFalsy()
      expect(rules.like({ before: 'cat', targetValue: 1 })).toBeFalsy()
      expect(rules.like({ targetValue: 'a' })).toBeFalsy()
      expect(rules.like({ before: 'cat water', targetValue: 'cat' })).toBeTruthy()
    })
  })

  describe('regex', () => {
    it('should return regex test', () => {
      expect(rules.regex({ before: 'ABCDF', ruleValue: 'ab', ruleValueFlags: 'i' })).toBeTruthy()
      expect(rules.regex({ before: 'http://fkljds lkflkj lkf3543!!!!', ruleValue: 'kj l', ruleValueFlags: 'ig' })).toBeTruthy()
      expect(rules.regex({ before: 'cat burrito' })).toBeFalsy()
      expect(rules.regex({ before: 'cat', targetValue: 1 })).toBeFalsy()
      expect(rules.regex({ targetValue: 'a' })).toBeFalsy()
    })
  })

})

// describe('mass editor clause rules', () => {

//   it('should return all replace', () => {
//     expect(rules.allReplace({ targetValue: 111 })).toEqual(111)
//   })

//   it('should return regex replace', () => {
//     expect(rules.regexReplace({
//       ruleValue: 'a',
//       flags: 'g',
//       target: 'text',
//       text: 'abcd',
//       targetValue: '!!!'
//     })).toEqual('!!!bcd')
//     expect(rules.regexReplace()).toEqual('')
//   })

//   it('should return startOf', () => {
//     expect(rules.startOf({ before: ' b', targetValue: 'a' })).toEqual('a b')
//     expect(rules.startOf({})).toEqual('')
//     expect(rules.startOf({ before: 'a', targetValue: '' })).toEqual('a')
//   })

//   it('should return endOf', () => {
//     expect(rules.endOf({ before: 'b', targetValue: ' a' })).toEqual('b a')
//     expect(rules.endOf({})).toEqual('')
//     expect(rules.endOf({ before: 'a', targetValue: '' })).toEqual('a')
//   })

// })
