import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

export default function KeywordsGenerator() {
  const [formData, setFormData] = useState({
    communityName: '',
    communityDescription: '',
    targetAudience: ''
  })
  const [keywords, setKeywords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState({})

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

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [id]: false }))
    }, 2000)
  }

  const copyAllKeywords = () => {
    if (keywords && keywords.length > 0) {
      const allKeywords = keywords.join(', ')
      navigator.clipboard.writeText(allKeywords)
      setCopied(prev => ({ ...prev, 'all': true }))
      setTimeout(() => {
        setCopied(prev => ({ ...prev, 'all': false }))
      }, 2000)
    }
  }

  return (
    <>
      <Head>
        <title>Keyword Generator - Skooler</title>
        <meta name="description" content="Generate SEO keywords and search terms for your Skool community" />
      </Head>
      <div className="min-h-screen bg-light">
        {/* Navigation */}
        <nav className="bg-light border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
              <div className="text-2xl font-bold text-[rgb(91,63,255)]">Skooler</div>
            </Link>
            <Link href="/" className="bg-primary text-light px-6 py-2 rounded hover:opacity-90 font-medium">
              ← Back Home
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              🎯 Keywords & Search Terms Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Get tailored SEO keywords and search terms for your Skool community. These keywords will help with discoverability, branding, and content creation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-dark mb-6">Tell us about your community</h2>

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
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-light font-bold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-60 transition transform hover:scale-105 active:scale-95"
                >
                  {loading ? 'Generating Keywords...' : 'Generate Keywords'}
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div>
              {!keywords && !loading && (
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20 h-full flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-xl font-bold text-dark mb-2">Ready to generate keywords?</h3>
                  <p className="text-gray-600 text-center">
                    Fill out the form to get a tailored list of SEO keywords and search terms for your Skool community.
                  </p>
                </div>
              )}

              {loading && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 h-full flex flex-col items-center justify-center">
                  <div className="animate-spin text-4xl mb-4">⚡</div>
                  <p className="text-gray-600 font-medium">Analyzing your community...</p>
                </div>
              )}

              {keywords && keywords.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-dark">Generated Keywords</h3>
                    <button
                      onClick={copyAllKeywords}
                      className="px-4 py-2 bg-primary hover:opacity-90 text-light font-semibold rounded-lg transition text-sm"
                    >
                      {copied['all'] ? '✓ Copied All' : 'Copy All'}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {keywords.map((keyword, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition"
                      >
                        <span className="text-dark font-medium">{keyword}</span>
                        <button
                          onClick={() => copyToClipboard(keyword, `keyword-${idx}`)}
                          className="text-primary hover:opacity-80 font-semibold text-sm whitespace-nowrap ml-3"
                        >
                          {copied[`keyword-${idx}`] ? '✓' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>💡 Tip:</strong> Use these keywords in your Skool community description, landing page, and content to improve discoverability and SEO.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setKeywords(null)
                      setFormData({
                        communityName: '',
                        communityDescription: '',
                        targetAudience: ''
                      })
                    }}
                    className="w-full mt-6 border-2 border-primary text-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary hover:text-light transition"
                  >
                    Generate More Keywords
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src="/logo.svg" alt="Skooler" className="w-6 h-6" />
              <div className="text-sm font-bold text-[rgb(91,63,255)]">Skooler</div>
            </div>
            <p className="text-sm text-gray-600">© 2026 Skooler. Built for community owners.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
