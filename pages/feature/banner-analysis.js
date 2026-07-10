import Link from 'next/link'
import Head from 'next/head'
import { useState, useRef } from 'react'

export default function BannerAnalysis() {
  const [bannerImage, setBannerImage] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB')
      return
    }

    setError('')
    const reader = new FileReader()
    reader.onload = (event) => {
      setBannerImage({
        file: file,
        preview: event.target?.result,
        name: file.name
      })
      setAnalysis(null)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!bannerImage) {
      setError('Please upload an image to analyze')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append('file', bannerImage.file)

      const response = await fetch('/api/analyze-banner', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to analyze banner')
      }

      const data = await response.json()

      // Check if image is not a banner
      if (data.isNotBanner) {
        setError(data.message || 'This is not a banner.')
        setAnalysis(null)
      } else {
        setAnalysis(data)
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Banner Analysis - Skooler</title>
        <meta name="description" content="Analyze your banner design and get professional feedback" />
      </Head>
      <div className="min-h-screen bg-light">
        <nav className="bg-light border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
              <div className="text-2xl font-bold text-[rgb(91,63,255)]">Skooler</div>
            </Link>
            <Link href="/" className="text-dark hover:text-primary font-medium">← Back</Link>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 md:px-6 py-16">
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-dark mb-6">Banner Analysis Tool</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Get professional feedback on banner design quality. Analyze text effectiveness, color choice, composition, and receive actionable recommendations to improve your community branding.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-dark mb-8">Upload & Analyze Your Banner</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-3">Banner Image *</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="w-full border-2 border-dashed border-primary rounded-lg p-8 flex flex-col items-center justify-center hover:bg-primary/5 transition disabled:opacity-50"
                  >
                    <div className="text-4xl mb-3">📸</div>
                    <p className="text-sm font-semibold text-dark">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </button>

                  {bannerImage && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-dark mb-3">Selected Image:</p>
                      <img
                        src={bannerImage.preview}
                        alt="Banner preview"
                        className="w-full rounded-lg border border-gray-200 object-cover max-h-64"
                      />
                      <p className="text-xs text-gray-500 mt-2">{bannerImage.name}</p>
                    </div>
                  )}
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
                  disabled={loading || !bannerImage}
                  className="w-full bg-primary text-light font-bold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-60 transition"
                >
                  {loading ? 'Analyzing Banner...' : 'Analyze Banner'}
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div>
              {!analysis && !loading && (
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 h-full flex flex-col items-center justify-center min-h-96">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Ready to Analyze?</h3>
                  <p className="text-gray-600 text-center">
                    Enter your banner details and get professional feedback on design quality, text effectiveness, and composition.
                  </p>
                </div>
              )}

              {loading && (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full flex flex-col items-center justify-center min-h-96">
                  <div className="animate-spin text-5xl mb-4">✨</div>
                  <p className="text-gray-600 font-medium text-lg">Analyzing your banner...</p>
                  <p className="text-gray-500 text-sm mt-2">Checking design quality and effectiveness</p>
                </div>
              )}

              {analysis && (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
                  {/* Overall Score */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                    <p className="text-gray-600 text-sm mb-2">Overall Quality Score</p>
                    <div className="flex items-baseline gap-3">
                      <div className="text-5xl font-bold text-primary">{analysis.overallScore}</div>
                      <div className="text-2xl text-gray-400">/10</div>
                    </div>
                  </div>

                  {/* Category Scores Grid */}
                  {analysis.categoryScores && (
                    <div>
                      <h4 className="text-lg font-bold text-dark mb-4">Category Scores</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(analysis.categoryScores).map(([key, score]) => {
                          const labelMap = {
                            visualAppeal: 'Visual Appeal',
                            layoutComposition: 'Layout & Composition',
                            typography: 'Typography',
                            colorHarmony: 'Color Harmony',
                            branding: 'Branding',
                            readability: 'Readability',
                            ctaVisibility: 'CTA Visibility',
                            messageClarity: 'Message Clarity',
                            professionalism: 'Professionalism',
                            marketingEffectiveness: 'Marketing Effectiveness'
                          }
                          return (
                            <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <p className="text-xs font-semibold text-gray-600 mb-2">
                                {labelMap[key] || key}
                              </p>
                              <div className="flex items-center gap-3">
                                <div className="flex-1">
                                  <div className="bg-gray-300 rounded-full h-2">
                                    <div
                                      className="bg-primary h-2 rounded-full"
                                      style={{ width: `${(score / 10) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <span className="text-lg font-bold text-dark">{score.toFixed(1)}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Strengths */}
                  {analysis.strengths && analysis.strengths.length > 0 && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-semibold text-green-700 mb-3">✓ Strengths:</p>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            <span className="text-green-600 font-semibold">•</span> {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Weaknesses */}
                  {analysis.weaknesses && analysis.weaknesses.length > 0 && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm font-semibold text-orange-700 mb-3">⚠ Areas for Improvement:</p>
                      <ul className="space-y-2">
                        {analysis.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            <span className="text-orange-600 font-semibold">•</span> {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {analysis.suggestions && analysis.suggestions.length > 0 && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-semibold text-blue-700 mb-3">💡 Actionable Suggestions:</p>
                      <ol className="space-y-2">
                        {analysis.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            <span className="text-blue-600 font-semibold">{idx + 1}.</span> {suggestion}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Summary */}
                  {analysis.summary && (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-900">{analysis.summary}</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setAnalysis(null)
                      setBannerImage(null)
                      setError('')
                    }}
                    className="w-full border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-light transition"
                  >
                    Analyze Another Banner
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-bold text-dark mb-2">Design Quality</h3>
              <p className="text-gray-600 text-sm">Get feedback on color, composition, and visual hierarchy</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-dark mb-2">Text Effectiveness</h3>
              <p className="text-gray-600 text-sm">Analysis of readability, length, and impact of your text</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-bold text-dark mb-2">Actionable Feedback</h3>
              <p className="text-gray-600 text-sm">Specific recommendations to improve your banner design</p>
            </div>
          </div>
        </main>

        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
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
