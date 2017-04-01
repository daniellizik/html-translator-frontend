import * as rules from '~/src/components/clause/rules'

describe('query clause rules', () => {

  describe('EQUALS', () => {
    it('should return equals test', () => {
      expect(rules.EQUALS({ before: 1, targetValue: 1 })).toBeTruthy()
      expect(rules.EQUALS({ before: 0 })).toBeFalsy()
      expect(rules.EQUALS({ before: null })).toBeFalsy()
    })
  })

  describe('NOT_EQUALS', () => {
    it('should return not equals test', () => {
      expect(rules.NOT_EQUALS({ before: 1, targetValue: 1 })).toBeFalsy()
      expect(rules.NOT_EQUALS({ before: 0, targetValue: undefined })).toBeFalsy()
      expect(rules.NOT_EQUALS({ before: null, targetValue: undefined })).toBeFalsy()
      expect(rules.NOT_EQUALS({ before: null, targetValue: 'a' })).toBeFalsy()
    })
  })

  describe('LIKE', () => {
    it('should return like test', () => {
      expect(rules.LIKE({ before: 'ab', targetValue: 'ABDEFF' })).toBeFalsy()
      expect(rules.LIKE({ before: 'cat burrito' })).toBeFalsy()
      expect(rules.LIKE({ before: 'cat', targetValue: 1 })).toBeFalsy()
      expect(rules.LIKE({ targetValue: 'a' })).toBeFalsy()
      expect(rules.LIKE({ before: 'cat water', targetValue: 'cat' })).toBeTruthy()
    })
  })

  describe('NOT_LIKE', () => {
    expect(rules.NOT_LIKE({ before: 'a', targetValue: 'b' })).toBeTruthy()
    expect(rules.NOT_LIKE({ before: '5', targetValue: '5' })).toBeFalsy()
    expect(rules.NOT_LIKE({ before: '5' })).toBeFalsy()
  })

  describe('REGEX', () => {
    it('should return regex test', () => {
      expect(rules.REGEX({ before: 'ABCDF', ruleValue: 'ab', ruleValueFlags: 'i' })).toBeTruthy()
      expect(rules.REGEX({ before: 'http://fkljds lkflkj lkf3543!!!!', ruleValue: 'kj l', ruleValueFlags: 'ig' })).toBeTruthy()
      expect(rules.REGEX({ before: 'cat burrito' })).toBeFalsy()
      expect(rules.REGEX({ before: 'cat', targetValue: 1 })).toBeFalsy()
      expect(rules.REGEX({ targetValue: 'a' })).toBeFalsy()
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
