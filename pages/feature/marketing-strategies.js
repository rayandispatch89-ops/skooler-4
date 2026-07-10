import Link from 'next/link'
import { useState } from 'react'

const initialForm = {
  communityName: '',
  niche: '',
  targetAudience: '',
  stage: 'launch',
  budget: 'both'
}

export default function MarketingStrategiesFeature() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [selectedFeatures, setSelectedFeatures] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureToggle = (title) => {
    setSelectedFeatures((prev) =>
      prev.includes(title)
        ? prev.filter((feature) => feature !== title)
        : [...prev, title]
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, selectedFeatures })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate strategy')
      }

      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const organicStrategies = [
    { title: 'Create Valuable Content', description: 'Publish educational posts, tips, case studies, and tutorials consistently on LinkedIn, X, Instagram, and Facebook.' },
    { title: 'Short-Form Video Content', description: 'Post daily reels and TikToks with actionable advice and invite viewers to join your Skool community.' },
    { title: 'SEO Blog Articles', description: 'Write articles targeting keywords your audience searches for and include a CTA to join your community.' },
    { title: 'YouTube Tutorials', description: 'Create in-depth tutorials and mention your Skool community in every video.' },
    { title: 'Email Newsletter', description: 'Send weekly newsletters with exclusive insights and invite subscribers to join the community.' },
    { title: 'Referral Program', description: 'Reward members for inviting friends with exclusive content, badges, or discounts.' },
    { title: 'Host Free Webinars', description: 'Teach a valuable topic and invite attendees to continue learning inside your community.' },
    { title: 'Community Challenges', description: 'Run 7-day, 14-day, or 30-day challenges to increase engagement and attract new members.' },
    { title: 'Guest Appearances', description: 'Appear on podcasts, YouTube channels, or live streams to reach new audiences.' },
    { title: 'Partnerships', description: 'Collaborate with creators, coaches, and businesses in your niche to cross-promote each other\'s communities.' }
  ]

  const paidStrategies = [
    { title: 'Facebook & Instagram Ads', description: 'Target audiences based on interests, behaviors, and lookalike audiences.' },
    { title: 'Google Search Ads', description: 'Bid on high-intent keywords related to your community\'s niche.' },
    { title: 'YouTube Ads', description: 'Promote your community before relevant videos in your niche.' },
    { title: 'LinkedIn Ads', description: 'Best for B2B, professional, and business-focused communities.' },
    { title: 'TikTok Ads', description: 'Use engaging short videos to attract younger audiences.' },
    { title: 'Influencer Sponsorships', description: 'Pay niche creators to recommend your Skool community.' },
    { title: 'Newsletter Sponsorships', description: 'Advertise in popular email newsletters that your target audience reads.' },
    { title: 'Podcast Sponsorships', description: 'Sponsor podcasts related to your niche to build awareness.' },
    { title: 'Retargeting Ads', description: 'Re-engage visitors who viewed your website but didn\'t join the community.' },
    { title: 'Affiliate Program', description: 'Pay affiliates a commission for every new member they bring to your community.' }
  ]

  const bonusTips = [
    'Offer a free lead magnet (eBook, checklist, template, or mini-course) to collect emails.',
    'Share member success stories and testimonials to build trust.',
    'Create a clear onboarding process to keep new members engaged.',
    'Use analytics to identify which channels drive the most active members.',
    'Test different messaging, creatives, and offers to improve conversion rates over time.'
  ]

  const allFeatures = [...organicStrategies, ...paidStrategies]

  return (
    <div className="min-h-screen bg-light">
      <nav className="bg-light border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
            <div className="text-2xl font-bold text-[rgb(91,63,255)]">Skooler</div>
          </Link>
          <Link href="/" className="text-dark hover:text-primary">← Back</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-4xl mb-6">
            📈
          </div>
          <h1 className="text-5xl font-bold text-dark mb-6">Marketing Strategies for Skool Communities</h1>
          <p className="text-xl text-gray-600 max-w-3xl">Generate a personalized growth strategy for your community, or browse 20 proven organic and paid tactics below.</p>
        </div>

        {/* Personalized Generator */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-24">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Community Name</label>
              <input name="communityName" value={form.communityName} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="e.g. Growth Lab" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Niche</label>
              <input name="niche" value={form.niche} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="e.g. AI automation" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Target Audience</label>
              <input name="targetAudience" value={form.targetAudience} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="e.g. early-stage founders" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Community Stage</label>
                <select name="stage" value={form.stage} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-4 py-3">
                  <option value="launch">Just Launching</option>
                  <option value="growth">Growing</option>
                  <option value="scale">Scaling</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Budget</label>
                <select name="budget" value={form.budget} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-4 py-3">
                  <option value="organic">Organic Only</option>
                  <option value="paid">Paid Only</option>
                  <option value="both">Organic + Paid</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5">
              <p className="text-sm text-gray-600 mb-4">Select the features you want to include in your generated strategy.</p>
              <div className="space-y-3">
                {allFeatures.map((feature) => (
                  <label
                    key={feature.title}
                    className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 cursor-pointer text-sm font-medium transition hover:border-primary/60"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedFeatures.includes(feature.title)}
                      onChange={() => handleFeatureToggle(feature.title)}
                    />
                    <span className="text-gray-400">★</span>
                    <span className={selectedFeatures.includes(feature.title) ? 'text-primary' : 'text-gray-700'}>{feature.title}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300">
              {loading ? 'Generating...' : 'Generate Strategy'}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>

          <div className="space-y-6">
            {result ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-8">
                {result.recommendedOrganic.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-3">Recommended Organic Tactics</h3>
                    <ul className="space-y-3">
                      {result.recommendedOrganic.map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-primary flex-shrink-0">✓</span>
                          <div>
                            <p className="font-semibold text-dark">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendedPaid.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-3">Recommended Paid Tactics</h3>
                    <ul className="space-y-3">
                      {result.recommendedPaid.map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-primary flex-shrink-0">★</span>
                          <div>
                            <p className="font-semibold text-dark">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-dark mb-3">Roadmap</h3>
                  <div className="space-y-4">
                    {result.roadmap.map((phase, idx) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4">
                        <p className="text-sm font-bold text-primary">{phase.phase} · {phase.timeframe} · {phase.focus}</p>
                        <ul className="mt-1 space-y-1">
                          {phase.actions.map((action, aIdx) => (
                            <li key={aIdx} className="text-sm text-gray-600">• {action}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-dark mb-3">Bonus Tips</h3>
                  <ul className="space-y-2">
                    {result.bonusTips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-primary flex-shrink-0">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
                <h2 className="text-2xl font-bold text-dark mb-4">What you'll get</h2>
                <ul className="space-y-3 text-gray-700">
                  <li>• Organic and paid tactics ranked for your community's stage</li>
                  <li>• A phased roadmap from week one to month three</li>
                  <li>• Bonus tips tailored to your niche and audience</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Organic Strategies */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-4xl">🌱</div>
            <h2 className="text-4xl font-bold text-dark">10 Organic Marketing Strategies</h2>
          </div>
          <p className="text-gray-600 mb-8">Build sustainable growth through valuable content and authentic community building.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organicStrategies.map((strategy, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary/50 transition">
                <div className="flex gap-3">
                  <div className="text-2xl text-primary flex-shrink-0">✓</div>
                  <div>
                    <h3 className="font-bold text-dark mb-2">{strategy.title}</h3>
                    <p className="text-gray-600 text-sm">{strategy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paid Strategies */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-4xl">💰</div>
            <h2 className="text-4xl font-bold text-dark">10 Paid Marketing Strategies</h2>
          </div>
          <p className="text-gray-600 mb-8">Accelerate growth with targeted advertising and strategic partnerships.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paidStrategies.map((strategy, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary/50 transition">
                <div className="flex gap-3">
                  <div className="text-2xl text-primary flex-shrink-0">★</div>
                  <div>
                    <h3 className="font-bold text-dark mb-2">{strategy.title}</h3>
                    <p className="text-gray-600 text-sm">{strategy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Tips */}
        <div className="mb-20 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-dark mb-8 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            Bonus Growth Tips
          </h2>
          <ul className="space-y-4">
            {bonusTips.map((tip, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-light rounded-xl p-12 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The Winning Formula</h2>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">Combining consistent organic content with targeted paid campaigns produces the strongest long-term growth for Skool communities.</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-dark mb-6">Ready to grow your community?</h3>
          <Link href="/" className="bg-primary text-light px-8 py-3 rounded-lg font-semibold hover:opacity-90 inline-block">
            Build Your Growth Strategy
          </Link>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/logo.svg" alt="Skooler" className="w-6 h-6" />
            <div className="text-sm font-bold text-[rgb(91,63,255)]">Skooler</div>
          </div>
          <p className="text-sm text-gray-600">© 2026 Skool.Online Partner</p>
        </div>
      </footer>
    </div>
  )
}
