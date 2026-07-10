const test = require('node:test')
const assert = require('node:assert/strict')
const { analyzeCommunityHealth } = require('../lib/healthScoreAnalyzer')

test('analyzeCommunityHealth returns a complete scorecard', () => {
  const result = analyzeCommunityHealth({
    keywords: 'founders community growth marketing',
    communityName: 'Growth Lab',
    shortDescription: 'A supportive community for founders learning how to grow a profitable online business with practical guidance and accountability.',
    longDescription: 'This community helps founders build momentum, refine their offer, and grow with confidence through expert guidance, peer support, and actionable strategies that improve marketing, sales, and retention.',
    bannerAnalysis: 'Strong banner with clear message and compelling visuals.',
    marketingStrategies: 'Weekly content, email campaigns, referral loops, and member showcases.'
  })

  assert.ok(result.overallHealthScore >= 0 && result.overallHealthScore <= 100)
  assert.ok(result.strengths.length > 0)
  assert.ok(result.weaknesses.length > 0)
  assert.ok(result.actionableRecommendations.length > 0)
  assert.ok(result.quickWins.length > 0)
  assert.ok(result.finalSummary.length > 0)
})
