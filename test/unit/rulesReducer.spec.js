import * as rules from '~/src/components/clause/settings/rules'

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

  describe('HAS_NONE', () => {
    it('should return true for array with 0 length', () => {
      expect(rules.HAS_NONE({before: []})).toBeTruthy()
    })
    it('should return false for array that does not have 0 length', () => {
      expect(rules.HAS_NONE({before: [{}]})).toBeFalsy()
    })
  })

  describe('HAS_AT_LEAST', () => {
    it('should return true for greater than or equal to', () => {
      expect(rules.HAS_AT_LEAST({
        before: [{}], 
        ruleValue: 1
      })).toBeTruthy()
      expect(rules.HAS_AT_LEAST({
        before: [1, 2, 3], 
        ruleValue: 4
      })).toBeFalsy()
    })
  })

})

describe('mutation rules', () => {

  it('should return ALL_REPLACE', () => {
    expect(rules.ALL_REPLACE({ targetValue: 'abc', ruleValue: 'bob' })).toEqual('bob')
  })

  it('should return REGEX_REPLACE', () => {
    expect(rules.REGEX_REPLACE({
      ruleValue: 'a',
      targetValue: 'that',
      before: 'a cat'
    })).toEqual('that cat')
  })

  it('should return START_OF', () => {
    expect(rules.START_OF({ before: ' b', ruleValue: 'a' })).toEqual('a b')
    expect(rules.START_OF({ before: 'a', ruleValue: '' })).toEqual('a')
  })

  it('should return END_OF', () => {
    expect(rules.END_OF({ before: 'b', ruleValue: ' a' })).toEqual('b a')
    expect(rules.END_OF({ before: 'a', ruleValue: '' })).toEqual('a')
  })

})
