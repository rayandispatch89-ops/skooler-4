export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { communityName, niche, targetAudience, description, goals } = req.body

  if (!communityName || !niche || !description || !goals) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const contentPlan = generateContentPlan({
      communityName,
      niche,
      targetAudience,
      description,
      goals
    })

    return res.status(200).json(contentPlan)
  } catch (error) {
    console.error('Error generating content plan:', error)
    return res.status(500).json({ error: 'Failed to generate content plan' })
  }
}

function generateContentPlan({ communityName, niche, targetAudience, description, goals }) {
  const hasEngagementGoal = goals.toLowerCase().includes('engagement') || goals.toLowerCase().includes('retention')
  const hasConversionGoal = goals.toLowerCase().includes('sales') || goals.toLowerCase().includes('leads') || goals.toLowerCase().includes('course') || goals.toLowerCase().includes('enrollment')

  const postTypes = [
    'Welcome Post',
    'Educational/Tip',
    'Discussion Question',
    'Poll/Survey',
    'Case Study/Success Story',
    'Webinar/Live Session Announcement',
    'Challenge/Call-to-Action'
  ]

  const days = [
    {
      title: 'Launch & Welcome',
      postType: postTypes[0],
      contentGoal: 'Set the tone and introduce your community to new members',
      hook: `Welcome to ${communityName} – Where ${niche.charAt(0).toUpperCase() + niche.slice(1)} Gets Real Results`,
      outline: `• What ${communityName} is about and who it's for\n• The specific transformation members will experience\n• What makes this community different (your unique angle)\n• Quick win or case study to prove value\n• What to expect from the community (culture, vibe, member benefits)`,
      cta: `If you're serious about ${niche.toLowerCase()}, comment "IN" below and tell me what result you want in the next 30 days.`,
      engagementTrigger: "What's one result you hope to achieve by being part of this community?"
    },
    {
      title: 'Value & Insight',
      postType: postTypes[1],
      contentGoal: 'Establish authority and provide immediate value',
      hook: `The #1 Mistake ${targetAudience || 'People'} Make With ${niche}`,
      outline: `• The mistake and why it happens\n• Real consequences of this mistake\n• The better approach (your methodology)\n• Step-by-step how-to or framework\n• Why this matters for their specific situation`,
      cta: `Save this and try it. Let me know in the comments what happens when you apply this.`,
      engagementTrigger: "Which of these mistakes have you made? Be honest—no judgment here."
    },
    {
      title: 'Community Engagement',
      postType: postTypes[2],
      contentGoal: 'Spark conversation and get members talking',
      hook: `Here's the Question Everyone Gets Wrong About ${niche}...`,
      outline: `• Pose a thoughtful, opinion-based question\n• Share your controversial take (if appropriate)\n• Ask members to share their perspective\n• Make it feel safe to disagree or share different views\n• Follow-up: promise to read and respond to every comment`,
      cta: `Drop your hot take in the comments. What's your answer?`,
      engagementTrigger: "I'll respond to every single comment—looking forward to hearing your thoughts."
    },
    {
      title: 'Social Proof & Trust',
      postType: postTypes[4],
      contentGoal: `Show real results to build credibility and ${hasConversionGoal ? 'encourage conversions' : 'attract quality members'}`,
      hook: `How [Member Name] Went From [Before State] to [After State] in ${generateRandomTimeframe()}`,
      outline: `• Who this member was before (situation, struggle, belief)\n• What changed for them (the shift, decision, or tool they used)\n• The results they achieved (specific, measurable outcomes)\n• What surprised them most about the process\n• One key insight they learned that anyone can apply`,
      cta: `${hasConversionGoal ? 'Want results like this? Comment CASE STUDY below.' : 'Comment with your biggest takeaway from this story.'}`,
      engagementTrigger: 'Which part of this journey resonates most with where you are right now?'
    },
    {
      title: 'Interactive Engagement',
      postType: postTypes[3],
      contentGoal: 'Boost engagement through participation',
      hook: `Quick Poll: What's Your Biggest Challenge With ${niche}?`,
      outline: `• Create 4-5 relatable options based on common struggles\n• Keep it simple and easy to answer\n• Explain why you're asking (upcoming content, research, etc.)\n• Promise to share results and insights\n• Mention you'll create content based on the top answers`,
      cta: `Vote in the comments. I'm reading every response and will share what I learn.`,
      engagementTrigger: "Once you vote, tell me: what's ONE thing you've already tried to solve this?"
    },
    {
      title: 'Deeper Teaching',
      postType: postTypes[1],
      contentGoal: 'Provide advanced value and showcase your expertise',
      hook: `The Framework I Use to ${generateActionableOutcome(niche)}`,
      outline: `• Why frameworks matter (save time, reduce guesswork)\n• Your 3-5 step framework (clear, memorable, actionable)\n• Real example of how you used it\n• Common mistakes people make with this framework\n• Where to go next (deeper dive content, next level)`,
      cta: `Use this framework today and report back. What results did you get?`,
      engagementTrigger: `Which step of this framework is most important to you right now?`
    },
    {
      title: 'Call to Action & Next Steps',
      postType: postTypes[6],
      contentGoal: `${hasConversionGoal ? 'Convert interest into action' : 'Build momentum and prepare for continued engagement'}`,
      hook: `The Next Level of ${communityName}`,
      outline: `• Recap what this week was about and what you learned\n• Showcase the best comments and member contributions\n• Share one thing that surprised you this week\n• Tease what's coming next (live session, new content, challenge)\n• Make a clear, specific invitation to the next step`,
      cta: `${hasConversionGoal ? 'Ready to go deeper? Reply "READY" and let\'s get you set up.' : 'Who\'s in for next week? Comment "I\'M IN" and tell me what you want to focus on.'}`,
      engagementTrigger: 'What was the biggest insight you had this week from the community?'
    }
  ]

  // Ensure we have engagement and conversion posts if needed
  if (hasEngagementGoal && days.filter(d => d.contentGoal.includes('discussion') || d.contentGoal.includes('participation')).length < 2) {
    days[2] = {
      ...days[2],
      contentGoal: 'Spark conversation and get members sharing experiences'
    }
  }

  if (hasConversionGoal && !days.some(d => d.cta.includes('READY') || d.cta.includes('convert'))) {
    days[6] = {
      ...days[6],
      contentGoal: 'Convert engaged members into customers/students',
      cta: 'This is where the real transformation happens. Reply "READY" if you\'re interested in going deeper.'
    }
  }

  return {
    communityName,
    niche,
    targetAudience,
    goals,
    generatedAt: new Date().toISOString(),
    days: days.map((day, idx) => ({
      ...day,
      dayNumber: idx + 1
    }))
  }
}

function generateRandomTimeframe() {
  const timeframes = ['30 days', 'just 60 days', '3 months', '90 days']
  return timeframes[Math.floor(Math.random() * timeframes.length)]
}

function generateActionableOutcome(niche) {
  const outcomes = {
    'ai': 'Automate Your Workflow With AI',
    'marketing': 'Attract More Customers Consistently',
    'coaching': 'Attract Your Ideal Clients',
    'sales': 'Close More Deals Faster',
    'business': 'Scale Your Business 10x',
    'fitness': 'Get Results That Last',
    'digital': 'Build Your Digital Empire',
    'content': 'Create Content That Converts',
    'course': 'Launch a Profitable Course',
    'community': 'Build an Engaged Community',
    'default': `Get Real Results in ${niche}`
  }

  const lowerNiche = niche.toLowerCase()
  for (const [key, value] of Object.entries(outcomes)) {
    if (key !== 'default' && lowerNiche.includes(key)) {
      return value
    }
  }

  return outcomes.default
}
