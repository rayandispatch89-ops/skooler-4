function buildTextBlock(value) {
  return value && value.trim() ? value.trim() : ''
}

const PROFESSIONAL_HINTS = ['founder', 'business', 'entrepreneur', 'executive', 'agency', 'agencies', 'consultant', 'marketer', 'b2b', 'coach', 'saas', 'freelancer', 'professional']

function detectAudienceType(targetAudience) {
  const lower = targetAudience.toLowerCase()
  return PROFESSIONAL_HINTS.some((hint) => lower.includes(hint)) ? 'professional' : 'consumer'
}

function organicPool(communityName, niche, targetAudience) {
  return [
    { title: 'Create Valuable Content', description: `Publish educational posts, tips, and case studies about ${niche} for ${targetAudience} on the platforms your audience already uses.`, tags: ['launch', 'growth', 'scale'] },
    { title: 'Short-Form Video Content', description: `Post daily reels and TikToks sharing quick, actionable ${niche} advice, and invite viewers to join ${communityName}.`, tags: ['launch', 'growth', 'scale'] },
    { title: 'SEO Blog Articles', description: `Write articles targeting keywords ${targetAudience} search for, with a clear call-to-action to join ${communityName}.`, tags: ['growth', 'scale'] },
    { title: 'YouTube Tutorials', description: `Create in-depth ${niche} tutorials and mention ${communityName} in every video description and outro.`, tags: ['growth', 'scale'] },
    { title: 'Email Newsletter', description: `Send a weekly newsletter with exclusive ${niche} insights and invite subscribers to join ${communityName}.`, tags: ['growth', 'scale'] },
    { title: 'Referral Program', description: `Reward existing members for inviting friends to ${communityName} with exclusive content, badges, or discounts.`, tags: ['growth', 'scale'] },
    { title: 'Host Free Webinars', description: `Teach a valuable ${niche} topic live, then invite attendees to keep learning inside ${communityName}.`, tags: ['launch', 'growth'] },
    { title: 'Community Challenges', description: `Run a 7-day or 14-day ${niche} challenge to spike engagement and attract new members to ${communityName}.`, tags: ['launch', 'growth'] },
    { title: 'Guest Appearances', description: `Appear on podcasts and YouTube channels ${targetAudience} already follow to reach new audiences for ${communityName}.`, tags: ['launch', 'growth'] },
    { title: 'Partnerships', description: `Collaborate with other creators and businesses serving ${targetAudience} to cross-promote ${communityName}.`, tags: ['launch', 'growth', 'scale'] },
  ]
}

function paidPool(communityName, niche, audienceType) {
  const consumerAds = [
    { title: 'Facebook & Instagram Ads', description: `Target ${audienceType === 'consumer' ? 'interest and lookalike audiences' : 'niche interest groups'} to drive ${niche}-focused signups for ${communityName}.`, tags: ['growth', 'scale'] },
    { title: 'TikTok Ads', description: `Use engaging short-form video ads to attract a younger, high-engagement audience into ${communityName}.`, tags: ['growth', 'scale'] },
    { title: 'YouTube Ads', description: `Promote ${communityName} before videos your ${niche} audience is already watching.`, tags: ['scale'] },
    { title: 'Influencer Sponsorships', description: `Pay niche creators trusted by ${targetAudiencePlaceholder(niche)} to recommend ${communityName}.`, tags: ['scale'] },
  ]
  const professionalAds = [
    { title: 'LinkedIn Ads', description: `Best for reaching ${niche} professionals directly with a targeted offer to join ${communityName}.`, tags: ['growth', 'scale'] },
    { title: 'Google Search Ads', description: `Bid on high-intent ${niche} keywords so ${communityName} shows up when your audience is actively searching.`, tags: ['growth', 'scale'] },
    { title: 'Newsletter Sponsorships', description: `Advertise ${communityName} in popular newsletters your professional audience already reads.`, tags: ['growth', 'scale'] },
    { title: 'Podcast Sponsorships', description: `Sponsor podcasts covering ${niche} topics to build awareness for ${communityName} among professionals.`, tags: ['scale'] },
  ]
  const shared = [
    { title: 'Retargeting Ads', description: `Re-engage visitors who viewed ${communityName} but did not join yet, keeping it top of mind.`, tags: ['growth', 'scale'] },
    { title: 'Affiliate Program', description: `Pay affiliates a commission for every new member they bring to ${communityName}, turning advocates into a growth channel.`, tags: ['scale'] },
  ]
  const primary = audienceType === 'professional' ? professionalAds : consumerAds
  return [...primary, ...shared]
}

function targetAudiencePlaceholder(niche) {
  return `people interested in ${niche}`
}

function pickByStage(pool, stage, count) {
  const ranked = [...pool].sort((a, b) => {
    const aMatch = a.tags.includes(stage) ? 1 : 0
    const bMatch = b.tags.includes(stage) ? 1 : 0
    return bMatch - aMatch
  })
  return ranked.slice(0, count).map(({ title, description }) => ({ title, description }))
}

function buildRoadmap(communityName, niche, stage, includesPaid) {
  const roadmap = [
    {
      phase: 'Phase 1',
      timeframe: 'Weeks 1-2',
      focus: 'Foundation',
      actions: [
        `Publish 3-4 pieces of core ${niche} content that show what ${communityName} stands for.`,
        `Set up a simple lead magnet (checklist, template, or mini-guide) to capture interest.`,
        `Post in 2-3 places your audience already spends time, with a clear link to ${communityName}.`,
      ],
    },
    {
      phase: 'Phase 2',
      timeframe: 'Month 1',
      focus: 'Momentum',
      actions: [
        `Run a short community challenge or free webinar to spike engagement.`,
        `Launch a referral incentive so early members start inviting others.`,
        `Start a weekly content cadence (newsletter, video, or blog) to stay visible.`,
      ],
    },
  ]

  if (includesPaid) {
    roadmap.push({
      phase: 'Phase 3',
      timeframe: 'Month 2-3',
      focus: 'Acceleration',
      actions: [
        `Test a small paid budget on the ad channel that best matches your audience.`,
        `Set up retargeting for visitors who did not convert on their first visit.`,
        `Introduce an affiliate or sponsorship push once organic channels are consistent.`,
      ],
    })
  } else {
    roadmap.push({
      phase: 'Phase 3',
      timeframe: 'Month 2-3',
      focus: 'Compounding',
      actions: [
        `Double down on the organic channel that is converting best.`,
        `Pursue 2-3 partnerships or guest appearances to reach new audiences.`,
        `Revisit paid ads later once organic momentum funds the experiment.`,
      ],
    })
  }

  return roadmap
}

function generateStrategy(input) {
  const communityName = buildTextBlock(input.communityName) || 'your community'
  const niche = buildTextBlock(input.niche) || 'your niche'
  const targetAudience = buildTextBlock(input.targetAudience) || 'your target audience'
  const stage = ['launch', 'growth', 'scale'].includes(input.stage) ? input.stage : 'launch'
  const budget = ['organic', 'paid', 'both'].includes(input.budget) ? input.budget : 'both'

  const audienceType = detectAudienceType(targetAudience)
  const includesOrganic = budget !== 'paid'
  const includesPaid = budget !== 'organic'
  const selectedSet = new Set(Array.isArray(input.selectedFeatures) ? input.selectedFeatures : [])

  const organicItems = organicPool(communityName, niche, targetAudience)
  const paidItems = paidPool(communityName, niche, audienceType)
  const filteredOrganic = selectedSet.size > 0 ? organicItems.filter((item) => selectedSet.has(item.title)) : organicItems
  const filteredPaid = selectedSet.size > 0 ? paidItems.filter((item) => selectedSet.has(item.title)) : paidItems

  const recommendedOrganic = includesOrganic ? pickByStage(filteredOrganic, stage, 5) : []
  const recommendedPaid = includesPaid ? pickByStage(filteredPaid, stage, 4) : []

  const roadmap = buildRoadmap(communityName, niche, stage, includesPaid)

  const bonusTips = [
    `Offer a free lead magnet built around ${niche} to start collecting emails from day one.`,
    `Share early member wins and testimonials to build trust with ${targetAudience}.`,
    `Create a simple onboarding flow so new members in ${communityName} feel oriented fast.`,
    `Track which channel brings the most active (not just the most) members, and double down there.`,
  ]

  return {
    audienceType,
    recommendedOrganic,
    recommendedPaid,
    roadmap,
    bonusTips,
  }
}

module.exports = {
  generateStrategy,
}
