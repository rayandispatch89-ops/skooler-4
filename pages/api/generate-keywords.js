// Generate premium SEO keywords with intelligent semantic analysis
function generateKeywordsLocally(communityName, communityDescription, targetAudience) {
  const lowValueWords = new Set(['the', 'and', 'for', 'with', 'from', 'that', 'this', 'are', 'your', 'is', 'a', 'an', 'by', 'or', 'to', 'of', 'in', 'on', 'at', 'be', 'have', 'has', 'get', 'set', 'about', 'as', 'was', 'were', 'been', 'being', 'do', 'does', 'did', 'can', 'could', 'should', 'would', 'may', 'might', 'must', 'will', 'shall', 'focused', 'looking', 'teaching', 'small', 'large', 'community', 'busy', 'serious', 'want', 'just', 'already', 'give', 'start', 'move', 'help', 'like', 'using', 'access', 'join', 'real', 'high', 'if', 'you', 're', 've', 'don', 'doesn', 'won', 'isn', 'aren', 'wasn', 'weren', 'hasn', 'haven', 'hadn', 'shouldn', 'wouldn', 'couldn', 'mightn', 'mustn', 'needn', 'path', 'clear', 'through', 'step', 'way', 'learn', 'learning', 'turning', 'faster', 'whether', 'build', 'building', 'base', 'beginner', 'course', 'training', 'lesson', 'class', 'module', 'resource', 'hub', 'group'])

  // Premium keywords with relevance scores (for ranking)
  const premiumKeywords = {
    'automation': 98, 'workflow': 96, 'workflows': 96, 'agent': 94, 'agents': 94,
    'income': 98, 'earning': 98, 'earnings': 98, 'revenue': 92, 'profit': 90,
    'tools': 82, 'platform': 87, 'integration': 90, 'api': 85,
    'code': 87, 'coding': 87, 'development': 85, 'builder': 84, 'no-code': 90,
    'ai': 99, 'machine': 87, 'neural': 82, 'algorithm': 84, 'data': 82, 'analytics': 87, 'learning': 85,
    'marketing': 87, 'business': 90, 'entrepreneur': 92, 'startup': 87, 'growth': 94, 'scaling': 92, 'revenue': 90,
    'health': 90, 'wellness': 92, 'meditation': 92, 'mindfulness': 94, 'yoga': 97, 'stress': 88, 'relief': 88,
    'strategy': 87, 'optimization': 90, 'management': 82, 'projects': 87, 'systems': 90, 'innovation': 85,
    'online': 75, 'digital': 88, 'social': 85, 'content': 85, 'creator': 87, 'community': 70
  }

  // Multi-word phrases to extract with high priority
  const multiWordPatterns = [
    /claude\s+code/gi, /claude\s+ai/gi, /ai\s+automation/gi, /ai\s+autobase/gi,
    /ai\s+agents?/gi, /automation\s+workflows?/gi, /no[\s\-]code/gi,
    /yoga\s+classes?/gi, /stress\s+relief/gi, /mental\s+health/gi,
    /digital\s+marketing/gi, /content\s+creation/gi, /social\s+media/gi,
    /web\s+development/gi, /machine\s+learning/gi, /deep\s+learning/gi,
    /financial\s+freedom/gi, /passive\s+income/gi, /side\s+hustle/gi,
    /health\s+wellness/gi, /inner\s+peace/gi, /open\s+source/gi
  ]

  // Extract multi-word phrases
  const extractMultiWordPhrases = (text) => {
    const found = []
    const lowerText = text.toLowerCase()
    multiWordPatterns.forEach(pattern => {
      const matches = lowerText.match(pattern)
      if (matches) {
        matches.forEach(m => {
          const normalized = m.toLowerCase().replace(/[\s\-]/g, ' ').trim()
          if (!found.includes(normalized)) found.push(normalized)
        })
      }
    })
    return found
  }

  // Extract single terms with intelligent ranking
  const extractQualityTerms = (text) => {
    let cleaned = text.toLowerCase()
      .replace(/it's/g, 'it is').replace(/you're/g, 'you are').replace(/don't/g, 'do not')
      .replace(/doesn't/g, 'does not').replace(/won't/g, 'will not').replace(/can't/g, 'cannot')
      .replace(/shouldn't/g, 'should not').replace(/wouldn't/g, 'would not').replace(/couldn't/g, 'could not')
      .replace(/isn't/g, 'is not').replace(/aren't/g, 'are not').replace(/wasn't/g, 'was not')
      .replace(/weren't/g, 'were not').replace(/hasn't/g, 'has not').replace(/haven't/g, 'have not')

    const terms = cleaned
      .split(/[\s,().'"!?:\-—]+/)
      .map(w => w.toLowerCase().trim())
      .filter(w => w.length >= 2 && !lowValueWords.has(w) && /^[a-z0-9]+$/.test(w) && !/^\d+$/.test(w))

    // Sort by premium score
    return [...new Set(terms)].sort((a, b) => {
      const scoreA = premiumKeywords[a] || 50
      const scoreB = premiumKeywords[b] || 50
      return scoreB - scoreA
    })
  }

  const fullText = `${communityName} ${communityDescription} ${targetAudience}`.toLowerCase()
  const nameTerms = extractQualityTerms(communityName).filter(t => !lowValueWords.has(t))
  const descTerms = extractQualityTerms(communityDescription)
  const audienceTerms = extractQualityTerms(targetAudience)
  const multiWords = extractMultiWordPhrases(communityDescription + ' ' + communityName)

  const keywords = []
  const added = new Set()

  const addKeyword = (kw) => {
    if (kw && kw.length > 1 && !added.has(kw) && !lowValueWords.has(kw)) {
      keywords.push(kw)
      added.add(kw)
      return true
    }
    return false
  }

  // 1. PRIORITY 1: Multi-word phrases (most specific and valuable)
  multiWords.slice(0, 6).forEach(kw => addKeyword(kw))

  // 2. PRIORITY 2: Top-ranked community name terms
  nameTerms.slice(0, 3).forEach(kw => addKeyword(kw))

  // 3. PRIORITY 3: Best 2-word name combinations
  if (nameTerms.length >= 2) {
    const combo = `${nameTerms[0]} ${nameTerms[1]}`
    if (combo.length < 20) addKeyword(combo)
  }

  // 4. PRIORITY 4: Premium single terms from description (score >= 85)
  for (const term of descTerms) {
    if (keywords.length >= 11) break
    if ((premiumKeywords[term] || 0) >= 85) {
      addKeyword(term)
    }
  }

  // 5. PRIORITY 5: Smart 2-word combinations from top description terms
  if (descTerms.length >= 2 && keywords.length < 10) {
    for (let i = 0; i < Math.min(3, descTerms.length - 1) && keywords.length < 10; i++) {
      const term1Score = premiumKeywords[descTerms[i]] || 0
      if (term1Score >= 80) {
        const combo = `${descTerms[i]} ${descTerms[i + 1]}`
        if (combo.length < 20 && fullText.includes(descTerms[i]) && fullText.includes(descTerms[i + 1])) {
          addKeyword(combo)
        }
      }
    }
  }

  // 6. PRIORITY 6: Audience terms with premium score
  for (const term of audienceTerms) {
    if (keywords.length >= 11) break
    if ((premiumKeywords[term] || 0) >= 85) {
      addKeyword(term)
    }
  }

  // 7. PRIORITY 7: Fill with remaining high-quality terms (score >= 75)
  for (const term of descTerms) {
    if (keywords.length >= 11) break
    if ((premiumKeywords[term] || 0) >= 75) {
      addKeyword(term)
    }
  }

  // 8. PRIORITY 8: Smart fallback - contextually relevant keywords
  if (keywords.length < 11) {
    const contextRelevant = ['automation', 'workflow', 'income', 'systems', 'platform', 'strategy',
      'health', 'wellness', 'growth', 'development', 'tools', 'integration', 'agents',
      'optimization', 'analytics', 'management', 'marketing', 'content', 'digital', 'social']

    for (const term of contextRelevant) {
      if (keywords.length >= 11) break
      if (!added.has(term) && (fullText.includes(term.replace(/s$/, '')) || fullText.includes(term))) {
        addKeyword(term)
      }
    }
  }

  // Final filtering: ensure 1-2 words, remove low-value, sort by score
  let result = keywords
    .filter(k => !lowValueWords.has(k) && k.length > 1)
    .filter((k, i, arr) => arr.indexOf(k) === i) // Remove exact duplicates
    .filter(k => {
      const wordCount = k.trim().split(/\s+/).length
      return wordCount === 1 || wordCount === 2
    })
    .sort((a, b) => {
      // Sort by premium score, prioritizing multi-word phrases
      const scoreA = (premiumKeywords[a] || 50) + (a.split(/\s+/).length === 2 ? 15 : 0)
      const scoreB = (premiumKeywords[b] || 50) + (b.split(/\s+/).length === 2 ? 15 : 0)
      return scoreB - scoreA
    })

  // Ensure exactly 11 keywords
  if (result.length < 11) {
    const contextRelevant = ['automation', 'workflow', 'income', 'systems', 'platform', 'strategy',
      'health', 'wellness', 'growth', 'development', 'tools', 'integration', 'agents',
      'optimization', 'analytics', 'management', 'marketing', 'content', 'digital', 'social',
      'learning', 'technology', 'professional', 'training', 'innovation', 'solution']

    for (const term of contextRelevant) {
      if (result.length >= 11) break
      if (!added.has(term) && (fullText.includes(term.replace(/s$/, '')) || fullText.includes(term))) {
        if (!result.includes(term) && !lowValueWords.has(term)) {
          result.push(term)
        }
      }
    }
  }

  return result.slice(0, 11)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { communityName, communityDescription, targetAudience } = req.body

    if (!communityName || !communityDescription || !targetAudience) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Try to use Claude API first
    const apiKey = process.env.CLAUDE_API_KEY
    const organizationId = process.env.CLAUDE_ORGANIZATION_ID

    if (apiKey && organizationId) {
      try {
        const prompt = `You are an SEO expert specializing in Skool communities. Generate EXACTLY 11 highly relevant, SHORT keywords for:
- Name: ${communityName}
- Description: ${communityDescription}
- Target Audience: ${targetAudience}

CRITICAL RULES:
1. Each keyword must be ONLY 1-2 words maximum
2. No long-tail phrases or full sentences
3. Focus on SEO-friendly, single terms or short combinations
4. Must be highly relevant to the community's niche
5. Must match the target audience interests

Examples of GOOD keywords: "marketing", "digital marketing", "entrepreneurs", "skills", "learning"
Examples of BAD keywords: "learn digital marketing online", "marketing strategies for entrepreneurs", "best course"

Output ONLY a JSON array with exactly 11 keywords. No explanations, markdown, or backticks - just pure JSON array.
["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8", "keyword9", "keyword10", "keyword11"]`

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-organization-id': organizationId
          },
          body: JSON.stringify({
            model: 'claude-opus-4-8',
            max_tokens: 500,
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
          })
        })

        if (response.ok) {
          const data = await response.json()
          const responseText = data.content[0].text

          // Parse the JSON array from the response
          let cleanedText = responseText.trim()
          if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.replace(/```json\s*/, '').replace(/```\s*$/, '')
          } else if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.replace(/```\s*/, '').replace(/```\s*$/, '')
          }

          const keywords = JSON.parse(cleanedText).slice(0, 11)

          if (Array.isArray(keywords) && keywords.length === 11) {
            return res.status(200).json({ keywords })
          }
        }
      } catch (apiError) {
        console.warn('Claude API unavailable, using fallback:', apiError.message)
        // Fall through to local generation
      }
    }

    // Fallback: Generate keywords locally
    const keywords = generateKeywordsLocally(communityName, communityDescription, targetAudience)

    return res.status(200).json({
      keywords: keywords,
      source: 'local' // Indicates this is from fallback
    })
  } catch (error) {
    console.error('Error generating keywords:', error)
    return res.status(500).json({
      error: 'Failed to generate keywords. Please try again.',
      details: error.message
    })
  }
}
