import Link from 'next/link'
import { useState } from 'react'

const initialForm = {
  communityName: '',
  targetAudience: '',
  communityPurpose: '',
  goals: '',
  keyBenefits: '',
  toneOfVoice: 'Professional'
}

export default function DescriptionsFeature() {
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
      const response = await fetch('/api/generate-descriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate descriptions')
      }

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
          <Link href="/" className="text-dark hover:text-primary">← Back to Home</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-4xl mb-6">✍️</div>
          <h1 className="text-5xl font-bold text-dark mb-6">Community Descriptions</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Create a short and long description for your community from a few details about your audience, purpose, and tone.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-16">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Community Name</label>
              <input name="communityName" value={form.communityName} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="e.g. Growth Lab" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Target Audience</label>
              <input name="targetAudience" value={form.targetAudience} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="e.g. early-stage founders" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Community Purpose</label>
              <textarea name="communityPurpose" value={form.communityPurpose} onChange={handleChange} required rows={3} className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="What is this community meant to help members do?" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Goals or Outcomes Members Want to Achieve</label>
              <textarea name="goals" value={form.goals} onChange={handleChange} rows={3} className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Key Benefits or Features</label>
              <textarea name="keyBenefits" value={form.keyBenefits} onChange={handleChange} rows={3} className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="Optional: weekly calls, templates, accountability, etc." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Tone of Voice</label>
              <select name="toneOfVoice" value={form.toneOfVoice} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-4 py-3">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Casual</option>
                <option>Premium</option>
                <option>Bold</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300">
              {loading ? 'Generating...' : 'Generate Descriptions'}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
              <h2 className="text-2xl font-bold text-dark mb-4">What you’ll get</h2>
              <ul className="space-y-3 text-gray-700">
                <li>• Short description for banners, social posts, or quick summaries</li>
                <li>• Long description for your community About page</li>
                <li>• Tailored copy based on your audience, goals, and tone</li>
              </ul>
            </div>

            {result ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Short Description</h3>
                  <p className="text-gray-700 leading-relaxed">{result.shortDescription}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Long Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{result.longDescription}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-gray-600">
                Fill in the form to generate polished descriptions for your community.
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/logo.svg" alt="Skool.Online" className="w-7 h-7" />
            <div className="text-sm font-bold text-primary">Skool.Online</div>
          </div>
          <p className="text-center text-sm text-gray-600">© 2026 Skool.Online Partner. Built for community owners.</p>
        </div>
      </footer>
    </div>
  )
}
