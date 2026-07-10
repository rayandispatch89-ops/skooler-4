const { generateStrategy } = require('../../lib/strategyGenerator')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { communityName, niche, targetAudience, stage, budget, selectedFeatures } = req.body || {}

  if (!communityName || !niche || !targetAudience) {
    return res.status(400).json({ error: 'Community name, niche, and target audience are required.' })
  }

  try {
    const result = generateStrategy({ communityName, niche, targetAudience, stage, budget, selectedFeatures })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate strategy.' })
  }
}
