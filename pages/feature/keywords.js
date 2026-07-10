import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

// Estimate SEO search volume for keywords
const estimateSearchVolume = (keyword) => {
  const lower = keyword.toLowerCase()

  // Two-word keywords typically have higher volume
  const wordCount = keyword.split(/\s+/).length
  const isMultiWord = wordCount === 2

  // Common high-volume keywords
  const highVolumeTerms = ['marketing', 'business', 'automation', 'course', 'ai', 'digital', 'growth', 'health', 'yoga', 'meditation']
  const isHighVolume = highVolumeTerms.some(term => lower.includes(term))

  // Tool names and brands
  const toolNames = ['claude', 'n8n', 'zapier', 'openclaw', 'antigravity']
  const isToolName = toolNames.some(tool => lower.includes(tool))

  let baseVolume = isMultiWord ? 3500 : 2800
  if (isHighVolume) baseVolume += 2500
  if (isToolName) baseVolume += 1500

  // Add variance based on keyword length
  const variance = Math.floor(Math.random() * 1000)
  return Math.max(500, baseVolume + variance)
}

export default function KeywordsFeature() {
  const [formData, setFormData] = useState({
    communityName: '',
    communityDescription: '',
    targetAudience: ''
  })
  const [keywords, setKeywords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedKeywords, setSelectedKeywords] = useState(new Set())

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setKeywords(null)
    setSelectedKeywords(new Set())

    try {
      if (!formData.communityName.trim() || !formData.communityDescription.trim() || !formData.targetAudience.trim()) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      const response = await fetch('/api/generate-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to generate keywords')
      }

      const data = await response.json()
      setKeywords(data.keywords)
    } catch (err) {
      setError(err.message || 'An error occurred while generating keywords')
    } finally {
      setLoading(false)
    }
  }

  const toggleKeyword = (keyword) => {
    const newSelected = new Set(selectedKeywords)
    if (newSelected.has(keyword)) {
      newSelected.delete(keyword)
    } else {
      newSelected.add(keyword)
    }
    setSelectedKeywords(newSelected)
  }

  const selectAll = () => {
    if (keywords) {
      setSelectedKeywords(new Set(keywords))
    }
  }

  const deselectAll = () => {
    setSelectedKeywords(new Set())
  }

  const copySelected = () => {
    if (selectedKeywords.size > 0) {
      const selected = Array.from(selectedKeywords).join(', ')
      navigator.clipboard.writeText(selected)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isAllSelected = keywords && keywords.length > 0 && selectedKeywords.size === keywords.length

  return (
    <>
      <Head>
        <title>Keywords & Search Terms Generator - Skooler</title>
        <meta name="description" content="Generate SEO keywords and search terms for your Skool community" />
      </Head>
      <div className="min-h-screen bg-light">
        {/* Navigation */}
        <nav className="bg-light border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
              <div className="text-2xl font-bold text-[rgb(91,63,255)]">Skooler</div>
            </Link>
            <Link href="/" className="text-dark hover:text-primary font-medium">← Back to Home</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-dark mb-6">
              Keywords & Search Terms Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Get exactly 11 AI-optimized keywords tailored to your Skool community. These keywords are perfect for discoverability, branding, and content creation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Form Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-dark mb-8">Tell us about your community</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Community Name */}
                <div>
                  <label htmlFor="communityName" className="block text-sm font-semibold text-dark mb-3">
                    Community Name *
                  </label>
                  <input
                    id="communityName"
                    name="communityName"
                    type="text"
                    placeholder="e.g., Digital Marketing Mastery"
                    value={formData.communityName}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">What is your community called?</p>
                </div>

                {/* Community Description */}
                <div>
                  <label htmlFor="communityDescription" className="block text-sm font-semibold text-dark mb-3">
                    Community Description *
                  </label>
                  <textarea
                    id="communityDescription"
                    name="communityDescription"
                    placeholder="Describe what your community is about, what topics you cover, and what makes it unique..."
                    value={formData.communityDescription}
                    onChange={handleInputChange}
                    disabled={loading}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition resize-none disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">Be specific about your niche, focus areas, and unique value proposition</p>
                </div>

                {/* Target Audience */}
                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-semibold text-dark mb-3">
                    Target Audience *
                  </label>
                  <textarea
                    id="targetAudience"
                    name="targetAudience"
                    placeholder="Who is your community for? (e.g., small business owners, freelancers, aspiring entrepreneurs, etc.)"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    disabled={loading}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition resize-none disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">Describe the ideal members of your community</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-light font-bold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-60 transition transform hover:scale-105 active:scale-95"
                >
                  {loading ? 'Generating 11 Keywords...' : 'Generate Keywords'}
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div>
              {!keywords && !loading && (
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 h-full flex flex-col items-center justify-center min-h-96">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Ready to Generate Keywords?</h3>
                  <p className="text-gray-600 text-center">
                    Fill out the form to get exactly 11 tailored keywords for your Skool community. Perfect for SEO, discoverability, and content creation.
                  </p>
                </div>
              )}

              {loading && (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full flex flex-col items-center justify-center min-h-96">
                  <div className="animate-spin text-5xl mb-4">⚡</div>
                  <p className="text-gray-600 font-medium text-lg">Analyzing your community...</p>
                  <p className="text-gray-500 text-sm mt-2">This usually takes 5-10 seconds</p>
                </div>
              )}

              {keywords && keywords.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-dark mb-6">Your 11 Keywords</h3>

                  {/* Keywords Grid */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
                    <div className="flex flex-wrap gap-3">
                      {keywords.map((keyword, idx) => {
                        const isSelected = selectedKeywords.has(keyword)
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition duration-200 ${
                              isSelected
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {keyword}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={isAllSelected ? deselectAll : selectAll}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                      {isAllSelected ? 'Deselect All' : 'Select All'}
                    </button>
                    <button
                      onClick={copySelected}
                      disabled={selectedKeywords.size === 0}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {copied ? '✓ Copied!' : `Copy Selected (${selectedKeywords.size})`}
                    </button>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                    <p className="text-sm text-blue-900">
                      <strong>💡 Pro Tip:</strong> Use these keywords in your Skool community description, landing page, social media, and content to maximize discoverability and attract your target audience. Click keywords to select them and copy multiple at once.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setKeywords(null)
                      setSelectedKeywords(new Set())
                      setFormData({
                        communityName: '',
                        communityDescription: '',
                        targetAudience: ''
                      })
                    }}
                    className="w-full border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-light transition"
                  >
                    Generate More Keywords
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-dark mb-2">SEO Optimized</h3>
              <p className="text-gray-600 text-sm">Keywords specifically chosen to improve search engine visibility and discoverability</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-dark mb-2">Brand Positioning</h3>
              <p className="text-gray-600 text-sm">Keywords that help position your community as a leader in your niche</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-dark mb-2">Content Ready</h3>
              <p className="text-gray-600 text-sm">Use these keywords for blog posts, social media, and marketing campaigns</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <img src="/logo.svg" alt="Skooler" className="w-7 h-7" />
              <div className="text-sm font-bold text-[rgb(91,63,255)]">Skooler</div>
            </div>
            <p className="text-center text-sm text-gray-600">© 2026 Skooler. Built for community owners.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
