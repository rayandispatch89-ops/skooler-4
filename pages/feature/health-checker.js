import Link from 'next/link'
import { useState } from 'react'

const initialForm = {
  keywords: '',
  communityName: '',
  shortDescription: '',
  longDescription: '',
  bannerAnalysis: '',
  marketingStrategies: ''
}

export default function HealthCheckerFeature() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/analyze-community-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to generate health score')
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light">
      <nav className="bg-light border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skool.Online" className="w-10 h-10" />
            <div className="text-2xl font-bold text-primary">Skool.Online</div>
          </Link>
          <Link href="/" className="text-dark hover:text-primary">← Back</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-4xl mb-6">💚</div>
          <h1 className="text-5xl font-bold text-dark mb-6">Community Health Score</h1>
          <p className="text-xl text-gray-600 max-w-2xl">Use your community’s positioning, descriptions, banner insights, and marketing approach to generate an overall health score and prioritized next steps.</p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-16">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Keywords & Search Terms</label>
              <textarea name="keywords" value={form.keywords} onChange={handleChange} required rows={3} className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="e.g. founders, online business, growth, community" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Community Name</label>
              <input name="communityName" value={form.communityName} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Community Short Description</label>
              <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} required rows={3} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Community Long Description</label>
              <textarea name="longDescription" value={form.longDescription} onChange={handleChange} required rows={4} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Banner Analysis Results</label>
              <textarea name="bannerAnalysis" value={form.bannerAnalysis} onChange={handleChange} required rows={3} className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="Summarize the banner rating or insights" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Marketing Strategies for the Skool Community</label>
              <textarea name="marketingStrategies" value={form.marketingStrategies} onChange={handleChange} required rows={4} className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="List your current or planned marketing efforts" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300">
              {loading ? 'Analyzing...' : 'Analyze Community Health'}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-xl border border-cyan-200">
              <h2 className="text-2xl font-bold text-dark mb-4">What the report includes</h2>
              <ul className="space-y-3 text-gray-700">
                <li>• Overall health score from 0 to 100</li>
                <li>• SEO and discoverability analysis</li>
                <li>• Branding and positioning evaluation</li>
                <li>• Description quality and banner review</li>
                <li>• Marketing strategy assessment and next steps</li>
              </ul>
            </div>

            {result ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-6">
                <div>
                  <div className="text-sm font-semibold text-cyan-700 mb-2">Overall Health Score</div>
                  <div className="text-4xl font-bold text-dark">{result.overallHealthScore}/100</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">SEO & Discoverability</h3>
                  <p className="text-gray-700">{result.seoAndDiscoverability.summary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Branding & Positioning</h3>
                  <p className="text-gray-700">{result.brandingAndPositioning.summary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Description Quality</h3>
                  <p className="text-gray-700">{result.descriptionQuality.summary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Banner Effectiveness</h3>
                  <p className="text-gray-700">{result.bannerEffectiveness.summary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Marketing Strategy</h3>
                  <p className="text-gray-700">{result.marketingStrategy.summary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Strengths</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">{result.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Weaknesses</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">{result.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Top Priority Improvements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">{result.topPriorityImprovements.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Actionable Recommendations</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">{result.actionableRecommendations.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Quick Wins</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">{result.quickWins.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Final Summary</h3>
                  <p className="text-gray-700">{result.finalSummary}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-gray-600">
                Fill in the form to generate a complete community health scorecard.
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/logo.svg" alt="Skool.Online" className="w-6 h-6" />
            <div className="text-sm font-bold text-primary">Skool.Online</div>
          </div>
          <p className="text-sm text-gray-600">© 2026 Skool.Online Partner</p>
        </div>
      </footer>
    </div>
  )
}
