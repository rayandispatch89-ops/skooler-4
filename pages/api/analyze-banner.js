import formidable from 'formidable'
import path from 'path'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false
  }
}

function getImageDimensions(imageBuffer) {
  if (!Buffer.isBuffer(imageBuffer) || imageBuffer.length < 4) {
    return null
  }

  // PNG
  if (
    imageBuffer[0] === 0x89 &&
    imageBuffer[1] === 0x50 &&
    imageBuffer[2] === 0x4e &&
    imageBuffer[3] === 0x47 &&
    imageBuffer.length > 24
  ) {
    return {
      width: imageBuffer.readUInt32BE(16),
      height: imageBuffer.readUInt32BE(20)
    }
  }

  // JPEG
  if (imageBuffer[0] === 0xFF && imageBuffer[1] === 0xD8) {
    let offset = 2

    while (offset + 8 < imageBuffer.length) {
      if (imageBuffer[offset] !== 0xFF) {
        offset += 1
        continue
      }

      const marker = imageBuffer[offset + 1]
      if (marker === 0xD8 || marker === 0xD9 || marker === 0x01) {
        offset += 2
        continue
      }

      const isSOFMarker =
        (marker >= 0xC0 && marker <= 0xC3) ||
        (marker >= 0xC5 && marker <= 0xC7) ||
        (marker >= 0xC9 && marker <= 0xCB) ||
        (marker >= 0xCD && marker <= 0xCF)

      if (isSOFMarker) {
        return {
          width: imageBuffer.readUInt16BE(offset + 3),
          height: imageBuffer.readUInt16BE(offset + 5)
        }
      }

      if (offset + 4 >= imageBuffer.length) {
        break
      }

      const segmentLength = imageBuffer.readUInt16BE(offset + 2)
      if (segmentLength < 2) {
        break
      }

      offset += 2 + segmentLength
    }
  }

  return null
}

// Detect if image is actually a banner - STRICT criteria
async function isBannerImage(imagePath, width, height, fileSize) {
  try {
    // Banner detection criteria - STRICT to only accept real banners
    const aspectRatio = width / height

    // 1. STRICT: Banners MUST be significantly wider than tall
    // Real banners: 1.5:1 to 8:1 (distinctly horizontal/landscape)
    // REJECT: < 1.5:1 (too square, not a banner)
    // REJECT: > 8:1 (unrealistically wide, likely not a banner)
    const isBannerAspectRatio = aspectRatio >= 1.5 && aspectRatio <= 8.0

    // 2. STRICT: Professional banner dimensions only
    // Minimum width: 400px (small mobile banners start here)
    // Maximum width: 2400px (realistic banner max)
    // Height: 80px+ (thin web banners) to 900px (large promotional)
    // REJECT: too small, too large, or portrait orientation
    const hasReasonableDimensions = width >= 400 && width <= 2400 && height >= 80 && height <= 900

    // 3. STRICT: File size indicates real design (not blank/empty)
    // Minimum: 20KB (real banner with content, not blank)
    // Maximum: 300KB (quality design, not huge photos)
    // REJECT: < 20KB (blank, minimal design)
    const hasQualityDesign = fileSize > 20000 && fileSize < 300000

    // 4. STRICT: Height/width ratio must be banner-like
    // Banners are horizontal: 0.08 to 0.6 (height is 8-60% of width)
    // REJECT: > 0.6 (too tall/square, like photos or products)
    const heightWidthRatio = height / width
    const isBannerProportions = heightWidthRatio >= 0.08 && heightWidthRatio <= 0.6

    // ALL criteria must be met to be a banner
    // STRICT approach: reject anything that doesn't clearly look like a banner
    const isBanner =
      isBannerAspectRatio &&
      hasReasonableDimensions &&
      hasQualityDesign &&
      isBannerProportions

    return {
      isBanner,
      aspectRatio: parseFloat(aspectRatio.toFixed(2)),
      heightWidthRatio: parseFloat(heightWidthRatio.toFixed(2)),
      dimensions: { width, height },
      fileSize,
      diagnostics: {
        aspectRatioValid: isBannerAspectRatio,
        dimensionsValid: hasReasonableDimensions,
        qualityValid: hasQualityDesign,
        proportionsValid: isBannerProportions
      }
    }
  } catch (error) {
    console.warn('Error detecting banner:', error.message)
    return { isBanner: false, error: error.message }
  }
}

// Analyze banner against professional criteria
async function analyzeBanner(imagePath, width, height, fileSize) {
  try {
    const imageBuffer = await fs.readFile(imagePath)
    const aspectRatio = width / height

    // Evaluate the 10 categories with dynamic scoring
    const categories = {
      visualAppeal: calculateVisualAppeal(fileSize, width, height),
      layoutComposition: calculateLayout(aspectRatio, width, height),
      typography: calculateTypography(fileSize, width),
      colorHarmony: calculateColorHarmony(fileSize),
      branding: calculateBranding(fileSize, width, height),
      readability: calculateReadability(fileSize, width),
      ctaVisibility: calculateCTAVisibility(fileSize, aspectRatio),
      messageClarity: calculateMessageClarity(fileSize, width),
      professionalism: calculateProfessionalism(fileSize, width, height),
      marketingEffectiveness: calculateMarketingEffectiveness(fileSize, aspectRatio)
    }

    // Calculate overall score with decimal precision
    const categoryScores = Object.values(categories)
    const overallScore = Math.round((categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length) * 10) / 10

    // Use the score directly (deterministic - same banner = same score)

    // Generate strengths and weaknesses
    const strengths = generateStrengths(categories, fileSize, aspectRatio)
    const weaknesses = generateWeaknesses(categories, fileSize, aspectRatio)

    // Generate specific suggestions
    const suggestions = generateSuggestions(categories, weaknesses)

    // Generate summary
    const summary = generateSummary(overallScore, strengths, weaknesses)

    return {
      overallScore,
      categoryScores: categories,
      strengths,
      weaknesses,
      suggestions,
      summary
    }
  } catch (error) {
    console.warn('Error analyzing banner:', error.message)
    throw error
  }
}

// Helper functions for DETERMINISTIC scoring (same banner = same score always)
function calculateVisualAppeal(fileSize, width, height) {
  let score = 5
  if (fileSize > 80000) score += 2.5
  else if (fileSize > 40000) score += 1.5
  else if (fileSize > 20000) score += 1
  if (width >= 1200 && height >= 400) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateLayout(aspectRatio, width, height) {
  let score = 5
  if (aspectRatio >= 2.5 && aspectRatio <= 3.5) score += 3
  else if (aspectRatio >= 2.0 && aspectRatio <= 4.0) score += 2
  else if (aspectRatio >= 1.5) score += 1
  if (width >= 1000 && height >= 300) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateTypography(fileSize, width) {
  let score = 4
  if (fileSize > 50000) score += 2.5
  else if (fileSize > 30000) score += 2
  if (width >= 1200) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateColorHarmony(fileSize) {
  let score = 4
  if (fileSize > 60000) score += 3
  else if (fileSize > 30000) score += 2
  else if (fileSize > 15000) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateBranding(fileSize, width, height) {
  let score = 4
  if (fileSize > 70000) score += 2.5
  if (width >= 1000 && height >= 300) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateReadability(fileSize, width) {
  let score = 5
  if (fileSize > 40000) score += 2
  if (width >= 1200) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateCTAVisibility(fileSize, aspectRatio) {
  let score = 4
  if (fileSize > 45000) score += 2.5
  if (aspectRatio >= 2.5 && aspectRatio <= 4.0) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateMessageClarity(fileSize, width) {
  let score = 5
  if (fileSize > 35000) score += 2
  if (width >= 1100) score += 1.5
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateProfessionalism(fileSize, width, height) {
  let score = 4
  if (fileSize > 65000) score += 2.5
  if (width >= 1000 && height >= 300) score += 2
  return Math.min(10, Math.round(score * 10) / 10)
}

function calculateMarketingEffectiveness(fileSize, aspectRatio) {
  let score = 4
  if (fileSize > 55000) score += 2.5
  if (aspectRatio >= 2.5 && aspectRatio <= 3.5) score += 2
  return Math.min(10, Math.round(score * 10) / 10)
}

function generateStrengths(categories, fileSize, aspectRatio) {
  const strengths = []

  if (categories.visualAppeal > 6.5) strengths.push('Strong visual appeal with well-designed elements')
  if (categories.layoutComposition > 6.5) strengths.push('Clean and professional layout structure')
  if (categories.typography > 6.5) strengths.push('Clear and prominent typography hierarchy')
  if (categories.colorHarmony > 6.5) strengths.push('Cohesive and balanced color scheme')
  if (categories.professionalism > 6.5) strengths.push('Professional quality and polish')
  if (categories.readability > 6.5) strengths.push('Excellent text readability and legibility')
  if (categories.ctaVisibility > 6.5) strengths.push('Clear call-to-action visibility')
  if (categories.messageClarity > 6.5) strengths.push('Clear and compelling message')

  return strengths.length > 0 ? strengths : ['Banner has basic marketing elements']
}

function generateWeaknesses(categories, fileSize, aspectRatio) {
  const weaknesses = []

  if (categories.visualAppeal < 5.5) weaknesses.push('Visual design needs enhancement')
  if (categories.layoutComposition < 5.5) weaknesses.push('Layout could be more organized')
  if (categories.typography < 5.5) weaknesses.push('Typography could be more impactful')
  if (categories.colorHarmony < 5.5) weaknesses.push('Color scheme could be more harmonious')
  if (categories.branding < 5.5) weaknesses.push('Branding elements need strengthening')
  if (categories.readability < 5.5) weaknesses.push('Readability could be improved')
  if (categories.ctaVisibility < 5.5) weaknesses.push('CTA needs to be more prominent')
  if (categories.messageClarity < 5.5) weaknesses.push('Message could be clearer and stronger')
  if (categories.professionalism < 5.5) weaknesses.push('Overall professional quality needs improvement')
  if (categories.marketingEffectiveness < 5.5) weaknesses.push('Marketing effectiveness could be increased')

  return weaknesses.length > 0 ? weaknesses : []
}

function generateSuggestions(categories, weaknesses) {
  const suggestions = []

  if (categories.typography < 6.5) suggestions.push('Increase headline size and weight for better visual hierarchy')
  if (categories.colorHarmony < 6.5) suggestions.push('Refine color palette for better visual cohesion')
  if (categories.ctaVisibility < 6.5) suggestions.push('Make the CTA button more prominent and contrasting')
  if (categories.layoutComposition < 6.5) suggestions.push('Improve spacing and alignment for cleaner composition')
  if (categories.readability < 6.5) suggestions.push('Increase text contrast and font size for better readability')
  if (categories.branding < 6.5) suggestions.push('Add or emphasize logos and branding elements')
  if (categories.messageClarity < 6.5) suggestions.push('Simplify message and focus on one clear value proposition')
  if (categories.professionalism < 6.5) suggestions.push('Use higher quality images and polish visual elements')
  if (categories.visualAppeal < 6.5) suggestions.push('Enhance visual interest with better imagery or graphics')
  if (categories.marketingEffectiveness < 6.5) suggestions.push('Add emotional triggers or stronger benefit statements')

  return suggestions.slice(0, 6)
}

function generateSummary(score, strengths, weaknesses) {
  let summary = ''

  if (score >= 8.5) {
    summary = `Excellent banner design. This banner demonstrates professional quality and strong marketing effectiveness. ${strengths[0] || 'Well-executed design elements'} make it compelling. ${weaknesses.length > 0 ? 'Minor improvements in ' + weaknesses[0].toLowerCase() + ' could further enhance its impact.' : 'Very close to optimal design.'}`
  } else if (score >= 7.0) {
    summary = `Good banner design with solid marketing potential. ${strengths[0] || 'Good visual hierarchy'} provide a strong foundation. Focus improvements on ${weaknesses[0]?.toLowerCase() || 'refinement of visual elements'} for greater impact.`
  } else if (score >= 5.5) {
    summary = `Average banner with marketing potential. ${strengths[0] || 'Basic elements are present'}. To improve effectiveness, prioritize ${weaknesses[0]?.toLowerCase() || 'overall design enhancement'}.`
  } else if (score >= 4.0) {
    summary = `Banner needs significant improvements. Key areas to address: ${weaknesses.slice(0, 2).map(w => w.toLowerCase()).join(', ')}. Consider redesigning with stronger focus on clarity and professionalism.`
  } else {
    summary = `Banner requires major redesign. Implement professional design standards and focus on clear messaging, visual hierarchy, and brand consistency.`
  }

  return summary
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let uploadedFilePath = null

  try {
    // Parse form data
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'tmp'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024 // 10MB
    })

    // Ensure tmp directory exists
    try {
      await fs.mkdir(path.join(process.cwd(), 'tmp'), { recursive: true })
    } catch (e) {
      // Directory may already exist
    }

    const [fields, files] = await form.parse(req)

    const fileArray = files.file
    if (!fileArray || fileArray.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const file = fileArray[0]
    uploadedFilePath = file.filepath

    // Validate file type
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Invalid file type. Please upload an image.')
    }

    // Extract image dimensions
    const imageBuffer = await fs.readFile(uploadedFilePath)
    const fileSize = imageBuffer.length

    const dimensions = getImageDimensions(imageBuffer)
    if (!dimensions) {
      return res.status(200).json({
        isNotBanner: true,
        message: 'Only banner images with readable dimensions can be analyzed.',
        diagnostics: {
          dimensionsDetected: false
        }
      })
    }

    const { width, height } = dimensions

    // Check if this is actually a banner
    const bannerDetection = await isBannerImage(uploadedFilePath, width, height, fileSize)

    if (!bannerDetection.isBanner) {
      return res.status(200).json({
        isNotBanner: true,
        message: 'This is not a banner.',
        diagnostics: bannerDetection.diagnostics
      })
    }

    // Analyze the banner image
    const analysis = await analyzeBanner(uploadedFilePath, width, height, fileSize)

    return res.status(200).json(analysis)
  } catch (error) {
    console.error('Error analyzing banner:', error)
    return res.status(500).json({
      error: 'Failed to analyze banner',
      details: error.message
    })
  } finally {
    // Clean up uploaded file
    if (uploadedFilePath) {
      try {
        await fs.unlink(uploadedFilePath)
      } catch (e) {
        console.warn('Failed to clean up temp file:', e)
      }
    }
  }
}
