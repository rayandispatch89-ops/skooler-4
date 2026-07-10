import { analyzeCommunityHealth } from '../../lib/healthScoreAnalyzer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { keywords, communityName, shortDescription, longDescription, bannerAnalysis, marketingStrategies } = req.body || {}

  if (!keywords || !communityName || !shortDescription || !longDescription || !bannerAnalysis || !marketingStrategies) {
    return res.status(400).json({ error: 'All fields are required to analyze the community health.' })
  }

  try {
    const result = analyzeCommunityHealth({
      keywords,
      communityName,
      shortDescription,
      longDescription,
      bannerAnalysis,
      marketingStrategies
    })

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to analyze community health.' })
  }
}
