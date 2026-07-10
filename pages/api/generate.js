export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { communityName, niche, description, targetAudience } = req.body

  if (!communityName || !niche || !description || !targetAudience) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const recommendations = generateRecommendations({
      communityName,
      niche,
      description,
      targetAudience,
    })
    res.status(200).json(recommendations)
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate recommendations' })
  }
}

function generateRecommendations({ communityName, niche, description, targetAudience }) {
  // Generate keywords based on niche and audience
  const keywords = generateKeywords(niche, targetAudience, description)

  // Generate short description
  const shortDescription = generateShortDescription(niche, targetAudience, description)

  // Generate long description
  const longDescription = generateLongDescription(
    communityName,
    niche,
    targetAudience,
    description
  )

  // Generate 7-day content plan
  const contentPlan = generateContentPlan(communityName, niche, targetAudience, description)

  return {
    keywords,
    short_description: shortDescription,
    long_description: longDescription,
    content_plan: contentPlan,
  }
}

function generateKeywords(niche, targetAudience, description) {
  const keywordTemplates = [
    `${niche} community`,
    `${niche} for ${targetAudience}`,
    `learn ${niche}`,
    `${niche} mastermind group`,
    `${niche} support network`,
    `how to ${niche.toLowerCase()}`,
    `${niche} tips and strategies`,
    `${niche} group coaching`,
    `${niche} peer community`,
    `connect with other ${niche} enthusiasts`,
  ]

  return keywordTemplates.slice(0, 9)
}

function generateShortDescription(niche, targetAudience, description) {
  const templates = [
    `Get clear strategies and peer support to master ${niche} faster.`,
    `Build real skills in ${niche} while connecting with ${targetAudience}.`,
    `Join a community focused on practical ${niche} wins and accountability.`,
    `Learn what actually works in ${niche} from people doing it.`,
    `${niche} strategies designed specifically for ${targetAudience}.`,
  ]
  return templates[0]
}

function generateLongDescription(communityName, niche, targetAudience, description) {
  return `This is for ${targetAudience} who want to move the needle in ${niche} without drowning in theory or generic advice. We focus on practical, actionable strategies that you can implement immediately—not motivational fluff.\n\nHere's how it works: members share real wins, drop insights from their projects, and get honest feedback from peers who've already been where you are. You'll get access to templates, case studies, and a network of people who speak your language.\n\nWhat makes this different is the specificity. Every conversation, resource, and recommendation is rooted in ${niche}, not repackaged from a dozen other communities. We move fast, cut through the noise, and focus on the results that matter.\n\nJoin if you're ready to level up with people who get it.`
}

function generateContentPlan(communityName, niche, targetAudience, description) {
  const postTypes = ['welcome', 'value/tip', 'engagement question', 'testimonial/social proof', 'poll', 'behind-the-scenes', 'call-to-action']

  const plan = [
    {
      day: 1,
      post_type: 'welcome',
      title: `Welcome to ${communityName}`,
      body: `Hey everyone, I'm thrilled to have you here. This community exists because I got tired of generic advice that doesn't actually work for ${targetAudience}.\n\nI've spent years in the trenches learning what works and what doesn't in ${niche}. I created this space so you don't have to figure it all out alone.\n\nHere's what we're about: we're practical, we cut through the noise, and we focus on real results. If you're ready to level up and connect with others who are serious about ${niche}, you're in the right place.\n\nLook around, introduce yourself in the thread below, and let's get to work.`,
    },
    {
      day: 2,
      post_type: 'value/tip',
      title: `One quick win you can implement today in ${niche}`,
      body: `Most people overcomplicate ${niche}. Here's the one thing that moved the needle for me faster than anything else.\n\n[Specific tip or strategy related to niche]. This alone cut my time spent on [relevant task] by about 40% and let me focus on high-impact work.\n\nThe reason this works: [brief explanation of why this strategy is effective].\n\nTry it this week and report back. I want to hear if you hit the same results or if you found a way to improve on it.`,
    },
    {
      day: 3,
      post_type: 'engagement question',
      title: `What's your biggest bottleneck right now?`,
      body: `I'm curious—if you could snap your fingers and solve one problem in your ${niche} work, what would it be?\n\nI ask because the more I talk to people in this space, the more I see patterns in where people get stuck. And once we know where the sticking points are, we can actually build resources that address them.\n\nDrop your answer in the replies. Specificity is golden here—the more detail you give, the better we can help each other.`,
    },
    {
      day: 4,
      post_type: 'testimonial/social proof',
      title: `Quick win from a member`,
      body: `I want to highlight something [Member Name] shared with me this week.\n\nThey came in focused on [specific challenge], and after implementing [strategy/advice from community], they managed to [specific result].\n\nWhat I appreciate is that they didn't wait for perfect conditions—they took action, iterated, and saw wins. That's the mindset that moves the needle in ${niche}.\n\nIf you're on the fence about being here, this is exactly what it looks like when you lean into the community and the resources we build together. Let's keep going.`,
    },
    {
      day: 5,
      post_type: 'poll',
      title: `Quick poll: Which area would help you most right now?`,
      body: `We're planning what to dig into deeper as a community, and I want to make sure we focus on what actually matters to you.\n\nWhich of these is eating up the most of your ${niche} time and energy right now?\n\n• [Option 1: specific challenge in the niche]\n• [Option 2: specific challenge in the niche]\n• [Option 3: specific challenge in the niche]\n• Something else entirely\n\nVote and tell me why in the replies. Your feedback shapes what we build.`,
    },
    {
      day: 6,
      post_type: 'behind-the-scenes',
      title: `How I approach ${niche} (my actual process)`,
      body: `I realized I talk about winning in ${niche}, but I haven't walked you through my actual process.\n\nHere's my simplified system: [Step 1] → [Step 2] → [Step 3]. Nothing fancy, but it's repeatable and it works.\n\n[Brief breakdown of each step with real examples]\n\nThe key is that I'm not optimizing for perfection—I'm optimizing for speed and learning. Every week I run this, I pick one thing to experiment with and tweak it based on results.\n\nThis isn't about copying my system exactly. It's about showing you what a real process looks like so you can build yours.`,
    },
    {
      day: 7,
      post_type: 'call-to-action',
      title: `Here's what we're building together`,
      body: `We're one week in, and I've been blown away by the questions, the wins being shared, and the energy.\n\nThis is only the beginning. Over the next month, we're rolling out [specific resources or initiatives]. And then beyond that, [longer-term vision].\n\nBut here's the thing: this only works if you're engaged. So I'm asking you to pick one action this week:\n\n1. Share one insight or win in the discussion thread\n2. Answer someone's question in the community\n3. DM me with one area you want to focus on\n\nJust one. Pick it and do it. Let's move fast together.`,
    },
  ]

  return plan
}
