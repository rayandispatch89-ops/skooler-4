function buildTextBlock(value) {
  return value && value.trim() ? value.trim() : ''
}

function countWords(value) {
  return buildTextBlock(value).split(/\s+/).filter(Boolean).length
}

function scoreSection(value, min, max) {
  const words = countWords(value)
  if (words >= max) return 8
  if (words >= min) return 7
  if (words >= Math.max(1, Math.floor(min / 2))) return 5
  return 3
}

function analyzeCommunityHealth(input) {
  const keywords = buildTextBlock(input.keywords)
  const communityName = buildTextBlock(input.communityName) || 'Your community'
  const shortDescription = buildTextBlock(input.shortDescription)
  const longDescription = buildTextBlock(input.longDescription)
  const bannerAnalysis = buildTextBlock(input.bannerAnalysis)
  const marketingStrategies = buildTextBlock(input.marketingStrategies)

  const seoScore = Math.min(100, 55 + scoreSection(keywords, 6, 10) * 3)
  const brandingScore = Math.min(100, 50 + scoreSection(communityName, 2, 4) * 4 + scoreSection(shortDescription, 20, 40) * 2)
  const descriptionScore = Math.min(100, 45 + scoreSection(shortDescription, 20, 40) * 3 + scoreSection(longDescription, 120, 220) * 1.5)
  const bannerScore = Math.min(100, 40 + (bannerAnalysis ? 20 : 0) + (bannerAnalysis && bannerAnalysis.toLowerCase().includes('strong') ? 10 : 0))
  const marketingScore = Math.min(100, 38 + scoreSection(marketingStrategies, 6, 12) * 4)

  const overallScore = Math.round((seoScore + brandingScore + descriptionScore + bannerScore + marketingScore) / 5)

  const strengths = []
  if (seoScore >= 70) strengths.push('Strong keyword positioning and discoverability potential')
  if (brandingScore >= 70) strengths.push('Clear community identity and positioning')
  if (descriptionScore >= 70) strengths.push('Compelling messaging in the community descriptions')
  if (bannerScore >= 70) strengths.push('Banner materials are likely supporting conversion')
  if (marketingScore >= 70) strengths.push('Marketing strategy is well-structured and actionable')

  const weaknesses = []
  if (seoScore < 70) weaknesses.push('SEO and discoverability need stronger keyword alignment')
  if (brandingScore < 70) weaknesses.push('Branding and audience positioning need sharper focus')
  if (descriptionScore < 70) weaknesses.push('Descriptions need more persuasive and specific language')
  if (bannerScore < 70) weaknesses.push('Banner content could better reinforce the offer')
  if (marketingScore < 70) weaknesses.push('Marketing plans need more depth and consistency')

  const topPriorityImprovements = []
  if (seoScore < 70) topPriorityImprovements.push('Refine your keywords and search terms around the core audience and offer')
  if (descriptionScore < 70) topPriorityImprovements.push('Upgrade the short and long descriptions with clearer benefits and stronger calls to action')
  if (bannerScore < 70) topPriorityImprovements.push('Make the banner messaging sharper and more conversion-focused')
  if (marketingScore < 70) topPriorityImprovements.push('Expand the marketing strategy with repeatable campaigns and member-driven promotion')

  const actionableRecommendations = [
    'Clarify your positioning with one core promise and one core audience.',
    'Make your descriptions more benefit-driven and less generic.',
    'Use your strongest keywords naturally in the community title, descriptions, and calls to action.',
    'Create a simple weekly content rhythm that turns members into advocates.',
    'Test a clearer banner headline and a stronger value proposition.'
  ]

  const quickWins = [
    'Add one strong keyword phrase to the community name or headline.',
    'Tighten the short description to highlight outcomes, not just features.',
    'Add one specific CTA to the banner and long description.',
    'Publish one high-value post this week to increase momentum.'
  ]

  const summary = overallScore >= 80
    ? `${communityName} appears to be in strong shape with a clear offer and good growth potential. Continue refining the details and doubling down on consistent promotion to sustain momentum.`
    : overallScore >= 60
      ? `${communityName} has a solid foundation but needs more clarity and consistency to unlock stronger engagement and discoverability. Focus on stronger positioning, sharper copy, and more intentional promotion.`
      : `${communityName} needs a stronger foundation before it can scale effectively. Tighten the positioning, improve the descriptions, and sharpen the marketing message before expecting meaningful growth.`

  return {
    overallHealthScore: overallScore,
    seoAndDiscoverability: {
      score: Math.round(seoScore),
      summary: seoScore >= 70 ? 'Keyword alignment is strong and discoverability should improve with consistent use.' : 'SEO and discoverability need more focused keyword and messaging work.'
    },
    brandingAndPositioning: {
      score: Math.round(brandingScore),
      summary: brandingScore >= 70 ? 'The community has a clear identity and a strong narrative foundation.' : 'The core value proposition should be more distinct and easier to understand.'
    },
    descriptionQuality: {
      score: Math.round(descriptionScore),
      summary: descriptionScore >= 70 ? 'The descriptions are persuasive and likely to support conversion.' : 'The descriptions need more specific and outcome-driven language.'
    },
    bannerEffectiveness: {
      score: Math.round(bannerScore),
      summary: bannerScore >= 70 ? 'The banner appears to support the offer well.' : 'The banner can be improved to communicate the value more clearly.'
    },
    marketingStrategy: {
      score: Math.round(marketingScore),
      summary: marketingScore >= 70 ? 'The marketing approach is actionable and likely to increase visibility.' : 'The strategy needs more depth and repeatable promotion tactics.'
    },
    strengths,
    weaknesses,
    topPriorityImprovements,
    actionableRecommendations,
    quickWins,
    finalSummary: summary
  }
}

module.exports = {
  analyzeCommunityHealth,
}
