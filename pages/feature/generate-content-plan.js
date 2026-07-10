import Link from 'next/link'
import { useState } from 'react'
import Head from 'next/head'

export default function GenerateContentPlan() {
  const [communityName, setCommunityName] = useState('')
  const [niche, setNiche] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [description, setDescription] = useState('')
  const [goals, setGoals] = useState('')
  const [loading, setLoading] = useState(false)
  const [contentPlan, setContentPlan] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!communityName.trim() || !niche.trim() || !description.trim() || !goals.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')
    setContentPlan(null)

    try {
      const response = await fetch('/api/generate-content-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          communityName,
          niche,
          targetAudience,
          description,
          goals
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content plan')
      }

      const data = await response.json()
      setContentPlan(data)
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const downloadPlan = () => {
    if (!contentPlan) return

    const text = formatPlanAsText(contentPlan)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', `${communityName}-7day-plan.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const formatPlanAsText = (plan) => {
    let text = `7-Day Content Plan for ${communityName}\n`
    text += `Niche: ${niche}\n`
    text += `Target Audience: ${targetAudience}\n`
    text += `Goals: ${goals}\n`
    text += `\n${'='.repeat(60)}\n\n`

    plan.days.forEach((day, idx) => {
      text += `DAY ${idx + 1}: ${day.title || 'Content Post'}\n`
      text += `${'─'.repeat(60)}\n`
      text += `Content Goal: ${day.contentGoal}\n`
      text += `Post Type: ${day.postType}\n`
      text += `Hook: ${day.hook}\n\n`
      text += `Outline:\n${day.outline.split('\n').map(line => `• ${line}`).join('\n')}\n\n`
      text += `CTA: ${day.cta}\n`
      text += `Engagement Trigger: ${day.engagementTrigger}\n\n`
    })

    return text
  }

  return (
    <>
      <Head>
        <title>7-Day Content Plan Generator - Skool</title>
        <meta name="description" content="Generate a customized 7-day content plan for your Skool community" />
      </Head>

      <div className="min-h-screen bg-light">
        <nav className="bg-light border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Skool" className="w-10 h-10" />
              <div className="text-2xl font-bold text-primary">Skool</div>
            </Link>
            <Link href="/" className="text-dark hover:text-primary font-medium">← Back</Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <div className="inline-block w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-4xl mb-6">
              📅
            </div>
            <h1 className="text-5xl font-bold text-dark mb-4">7-Day Content Plan Generator</h1>
            <p className="text-xl text-gray-600">
              Create a customized, high-engagement content plan tailored to your community's niche and goals. Each day includes hooks, outlines, CTAs, and engagement triggers.
            </p>
          </div>

          {!contentPlan ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Community Name */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Community Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., AI Creators Hub, Coaching Masters, etc."
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">The name of your Skool community</p>
                </div>

                {/* Niche */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Niche/Industry *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., AI tools, Digital marketing, Fitness coaching"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">What industry or topic is your community focused on?</p>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Target Audience (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Freelancers, solopreneurs, agencies, beginners"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Who are the primary members? (experience level, role, type)</p>
                </div>

                {/* Community Description */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Community Description *
                  </label>
                  <textarea
                    placeholder="Describe what your community is about, what you teach/offer, and what makes it unique. Be specific and detailed."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">The more detail, the better the content plan will be</p>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Community Goals *
                  </label>
                  <textarea
                    placeholder="e.g., Increase engagement, attract 100 new members, launch course, build authority, daily active members"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">What are you trying to achieve with this content plan?</p>
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
                  className="w-full bg-primary text-light font-bold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-60 transition"
                >
                  {loading ? 'Generating Your Content Plan...' : 'Generate 7-Day Plan'}
                </button>

                <p className="text-center text-xs text-gray-500">
                  This will create a detailed, niche-specific content plan optimized for Skool communities.
                </p>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-light rounded-xl p-8 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your 7-Day Content Plan</h2>
                  <p className="opacity-90">{communityName} • {niche}</p>
                </div>
                <button
                  onClick={downloadPlan}
                  className="bg-light text-indigo-600 px-6 py-2 rounded-lg font-bold hover:opacity-90 transition"
                >
                  ↓ Download Plan
                </button>
              </div>

              {/* Content Days */}
              <div className="space-y-6">
                {contentPlan.days.map((day, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-8">
                    <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="text-2xl font-bold text-dark">Day {idx + 1}</h3>
                        <p className="text-primary font-semibold">{day.postType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl">
                          {idx === 0 ? '🎬' : idx === 1 ? '💡' : idx === 2 ? '❓' : idx === 3 ? '📊' : idx === 4 ? '🎯' : idx === 5 ? '👥' : '🚀'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">Content Goal</h4>
                        <p className="text-dark">{day.contentGoal}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">Hook / Title</h4>
                        <p className="text-dark font-semibold">{day.hook}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">Content Outline</h4>
                        <ul className="space-y-2">
                          {day.outline.split('\n').map((point, i) => (
                            <li key={i} className="flex gap-3 text-dark">
                              <span className="text-primary font-bold flex-shrink-0">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">Call-to-Action</h4>
                        <p className="text-dark italic">"{day.cta}"</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">Engagement Trigger</h4>
                        <p className="text-dark italic">"{day.engagementTrigger}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                <h3 className="text-xl font-bold text-dark mb-4">Next Steps</h3>
                <ol className="space-y-2">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span className="text-dark">Copy each day's content and customize with your voice/examples</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span className="text-dark">Schedule posts one per day in your Skool community</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span className="text-dark">Monitor engagement and reply to comments</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span className="text-dark">Use analytics to see which post types perform best</span>
                  </li>
                </ol>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={downloadPlan}
                  className="flex-1 bg-primary text-light font-bold py-3 px-6 rounded-lg hover:opacity-90 transition"
                >
                  ↓ Download as Text File
                </button>
                <button
                  onClick={() => {
                    setContentPlan(null)
                    setCommunityName('')
                    setNiche('')
                    setTargetAudience('')
                    setDescription('')
                    setGoals('')
                  }}
                  className="flex-1 border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary/5 transition"
                >
                  Create Another Plan
                </button>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src="/logo.svg" alt="Skool" className="w-6 h-6" />
              <div className="text-sm font-bold text-primary">Skool</div>
            </div>
            <p className="text-sm text-gray-600">© 2026 Skool. Built for community owners.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
