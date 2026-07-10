import { generateDescriptions } from '../../lib/descriptionGenerator'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { communityName, targetAudience, communityPurpose, goals, keyBenefits, toneOfVoice } = req.body || {}

  if (!communityName || !targetAudience || !communityPurpose) {
    return res.status(400).json({ error: 'Community name, target audience, and purpose are required.' })
  }

  try {
    const result = generateDescriptions({
      communityName,
      targetAudience,
      communityPurpose,
      goals,
      keyBenefits,
      toneOfVoice
    })

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate descriptions.' })
  }
}
