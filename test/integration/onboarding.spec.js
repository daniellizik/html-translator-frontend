import story from '~/test/storyFixtures/onboarding'

describe('onboarding step 0', () => {
  it('should be at step 0', () => {
    expect(story[0].onboarding.step).toBe(0)
  })
  it('overlay should be visible', () => {
    expect(story[0].overlay).toBeTruthy()
  })
})

describe('onboarding step 1', () => {
  it('should be at step 1', () => {
    expect(story[1].onboarding.step).toBe(1)
  })
  it('overlay should be visible', () => {
    expect(story[2].overlay).toBeTruthy()
  })
})

describe('onboarding step 2', () => {
  it('should be at step 2', () => {
    expect(story[2].onboarding.step).toBe(2)
  })
  it('should insert sample email url', () => {
    expect(story[2].source.url).toBe('/www/sample-email.html')
    expect(story[2].source.lastModified).toBe('url')
  })
})

describe('onboarding step 3', () => {
  it('should be at step 3', () => {
    expect(story[3].onboarding.step).toBe(3)
  })
  it('overlay should be hidden',() => {
    expect(story[3].overlay).toBeFalsy()
  })
  it('should have no clauses', () => {
    expect(story[3].clauses.length).toBe(0)
  })
  it('should have xml tree', () => {
    expect(story[3].slave.xml.length).toBeGreaterThan(100)
  })
})

describe('onboarding step 4', () => {
  it('should be at step 4', () => {
    expect(story[4].onboarding.step).toBe(4)
  })
  it('overlay should be hidden',() => {
    expect(story[4].overlay).toBeFalsy()
  })
  it('should have one clause', () => {
    expect(story[4].clauses.length).toBe(1)
  })
  it('should have xml tree', () => {
    expect(story[4].slave.xml.length).toBeGreaterThan(100)
  })
  it('should have one default query', () => {
    expect(story[4].clauses[0].queries.length).toBe(1)
  })
  it('should have one default mutation', () => {
    expect(story[4].clauses[0].mutations.length).toBe(1)
  })
})

