function buildTextBlock(value) {
  return value && value.trim() ? value.trim() : ''
}

function cleanList(values) {
  return values
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function generateDescriptions(input) {
  const communityName = buildTextBlock(input.communityName) || 'This community'
  const targetAudience = buildTextBlock(input.targetAudience) || 'ambitious professionals'
  const communityPurpose = buildTextBlock(input.communityPurpose) || 'help members grow and learn faster'
  const goals = buildTextBlock(input.goals) || 'achieve meaningful progress and lasting results'
  const keyBenefits = buildTextBlock(input.keyBenefits) || 'practical support and peer accountability'
  const toneOfVoice = buildTextBlock(input.toneOfVoice) || 'professional'

  const benefitsList = cleanList(keyBenefits)
  const benefitSentence = benefitsList.length > 0
    ? `Key benefits include ${benefitsList.join(', ')}.`
    : 'Key benefits include practical support and peer accountability.'

  const shortDescription = `Join ${communityName}, a ${toneOfVoice} community for ${targetAudience} focused on ${communityPurpose}. Members gain practical support, clear direction, and a path to ${goals}.`

  const longDescription = `Welcome to ${communityName}, a ${toneOfVoice} community created for ${targetAudience} who want to ${communityPurpose}. This space helps members turn ideas into action through practical guidance, meaningful connection, and consistent support. Whether you are building momentum or refining your next step, ${communityName} offers the encouragement and accountability needed to stay focused and make real progress. ${benefitSentence} Members leave with stronger clarity, better habits, and the confidence to keep moving toward ${goals}. The community is designed for people who value collaboration, feedback, and steady progress, and it gives them a welcoming place to learn, share, and grow with others who understand their journey. By combining practical resources with thoughtful discussion, ${communityName} helps members stay motivated, build momentum, and create real change in the areas that matter most. It is a place for reflection, experimentation, and support, where members can ask questions, celebrate wins, and keep moving forward with purpose.`

  return {
    shortDescription: shortDescription.trim(),
    longDescription: longDescription.trim(),
  }
}

module.exports = {
  generateDescriptions,
}
