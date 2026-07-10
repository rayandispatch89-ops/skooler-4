const test = require('node:test')
const assert = require('node:assert/strict')
const { generateDescriptions } = require('../lib/descriptionGenerator')

test('generateDescriptions creates a short and long description from form input', () => {
  const result = generateDescriptions({
    communityName: 'Growth Lab',
    targetAudience: 'early-stage founders',
    communityPurpose: 'help founders build profitable online businesses',
    goals: 'grow revenue and build consistent marketing systems',
    keyBenefits: 'weekly live calls, templates, and peer accountability',
    toneOfVoice: 'friendly'
  })

  const shortWords = result.shortDescription.trim().split(/\s+/).filter(Boolean).length
  const longWords = result.longDescription.trim().split(/\s+/).filter(Boolean).length

  assert.ok(shortWords >= 20 && shortWords <= 60)
  assert.ok(longWords >= 150 && longWords <= 500)
  assert.match(result.longDescription, /Growth Lab/i)
})
