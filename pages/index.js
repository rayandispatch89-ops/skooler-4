import Link from 'next/link'
import Head from 'next/head'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

export default function Landing() {
  const { isAuthenticated, signOut, user, loading } = useAuth()
  const [showInstagramTooltip, setShowInstagramTooltip] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [count60, setCount60] = useState(1)
  const [count100, setCount100] = useState(1)
  const [count7, setCount7] = useState(1)
  const [strategyForm, setStrategyForm] = useState({
    communityName: '',
    niche: '',
    targetAudience: '',
    stage: 'launch',
    budget: 'both'
  })
  const [strategyLoading, setStrategyLoading] = useState(false)
  const [strategyError, setStrategyError] = useState('')
  const [strategyResult, setStrategyResult] = useState(null)

  const handleStrategyChange = (e) => {
    const { name, value } = e.target
    setStrategyForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleStrategySubmit = async (e) => {
    e.preventDefault()
    setStrategyLoading(true)
    setStrategyError('')
    setStrategyResult(null)

    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strategyForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate strategy')
      }

      setStrategyResult(data)
    } catch (err) {
      setStrategyError(err.message || 'Something went wrong')
    } finally {
      setStrategyLoading(false)
    }
  }

  const faqs = [
    {
      question: "How long does it take to generate a strategy?",
      answer: "Just 60 seconds. Fill in 4 simple fields about your community and instantly get keywords, descriptions, and a complete 7-day content plan. No waiting, no complexity."
    },
    {
      question: "Can I edit the generated content?",
      answer: "Absolutely! All content is fully editable. You can modify keywords, tweak descriptions, adjust post topics, or rewrite anything to match your community's unique voice and style."
    },
    {
      question: "Is this really AI-powered?",
      answer: "Yes. Our intelligent system analyzes your niche, target audience, and community description to generate specific, actionable recommendations tailored to your market not generic templates."
    },
    {
      question: "Do I need an account to use this?",
      answer: "Not for the MVP. Just fill out the form and get your strategy instantly. No sign-up, no credit card, no login required. Simple and straightforward."
    },
    {
      question: "Can I save and reuse my strategies?",
      answer: "Coming soon! In Phase 2, we're adding user accounts so you can save unlimited strategies, track what works best, and refine your approach over time."
    },
    {
      question: "What makes this different from other tools?",
      answer: "We're built specifically for Skool communities. Everything from the keywords to the content plan is tailored to Skool dynamics and audience expectations not generic advice for every platform."
    },
    {
      question: "What if my strategy doesn't work?",
      answer: "You can generate unlimited strategies. Each one is based on your specific inputs, so try different angles focus on different pain points, adjust your positioning, or refine your target audience and generate a new strategy."
    },
    {
      question: "How do I get the most out of this?",
      answer: "Be specific about your niche and target audience. The more detail you provide, the more tailored your strategy. Then follow the 7-day content plan, track engagement, and iterate based on what resonates with your community."
    }
  ]

  const ADMIN_EMAILS = [
    'wahabilyas205@gmail.com',
    'abdullah987570@gmail.com',
    'ashfaqawan90op@gmail.com',
    'rayan.dispatch89@gmail.com'
  ]
  const isAdmin = !loading && isAuthenticated && ADMIN_EMAILS.includes(user?.email)

  const handleLogout = async () => {
    await signOut()
  }

  useEffect(() => {
    const duration = 1200
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)

      setCount60(Math.max(1, Math.round(1 + (60 - 1) * progress)))
      setCount100(Math.max(1, Math.round(1 + (100 - 1) * progress)))
      setCount7(Math.max(1, Math.round(1 + (7 - 1) * progress)))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <>
      <Head>
        <title>Skooler - AI Community Growth Strategies in 60 Seconds</title>
        <meta
          name="description"
          content="Skooler - Generate proven growth strategies for your Skool community in 60 seconds. AI-powered keywords, descriptions, 7-day content plans, and marketing strategies."
        />
      </Head>
      <div className="min-h-screen bg-light">
        {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 py-[15px]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/logo.svg" alt="Skooler" className="w-9 h-9" />
              <div className="text-lg font-bold text-[rgb(91,63,255)] hidden sm:block">Skooler</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 text-sm font-normal hover:text-gray-900 transition-colors duration-200">Features</Link>
              <Link href="#pricing" className="text-gray-600 text-sm font-normal hover:text-gray-900 transition-colors duration-200">Pricing</Link>
              <Link href="#testimonials" className="text-gray-600 text-sm font-normal hover:text-gray-900 transition-colors duration-200">Testimonials</Link>
              <Link href="/contact" className="text-gray-600 text-sm font-normal hover:text-gray-900 transition-colors duration-200">Contact Us</Link>

              {isAdmin && (
                <Link href="/admin" className="text-gray-600 text-sm font-normal hover:text-gray-900 transition-colors duration-200">
                  Admin
                </Link>
              )}
            </div>

            {/* Auth Buttons & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {!loading && isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline-flex bg-[#5b3fff] text-white px-7 py-3 rounded-full hover:bg-[#4a33df] font-semibold transition-all duration-200 text-sm"
                >
                  Logout
                </button>
              ) : (
                <Link href="/auth" className="hidden sm:inline-flex bg-[#5b3fff] text-white px-7 py-3 rounded-full hover:bg-[#4a33df] font-semibold transition-all duration-200 text-sm">
                  Get Started
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3 animate-in fade-in duration-200">
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition"
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition"
              >
                Contact Us
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-dark hover:text-primary bg-primary/10 rounded-lg font-medium transition"
                >
                  ⚙️ Admin
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white pt-16 pb-20 md:pb-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-purple-700">
              <span className="mr-2">⚡</span>
              AI-Powered Growth
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl sm:text-[4.5rem] md:text-[5.25rem] font-semibold tracking-[-0.04em] text-slate-950 leading-[1.02]">
              Your AI Partner for <span className="text-[#5b3fff]">Community Growth</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-slate-500 leading-8">
              Get complete growth strategies in <span className="font-semibold text-[#5b3fff]">60 seconds</span>, not weeks. Keywords, descriptions, content plans, and marketing strategies—everything you need to scale your community.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#generate-strategy" className="inline-flex items-center justify-center rounded-full bg-[#5b3fff] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_24px_80px_rgba(91,63,255,0.20)] transition duration-300 hover:bg-[#4b39f9]">
                Generate Strategy Now
              </a>
              <button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-400 hover:bg-slate-50">
                View Examples
              </button>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                <img src="https://aiautobase.com/images/testimonials/testimonial-2.webp" alt="Community testimonial 1" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-[0_15px_45px_rgba(91,63,255,0.16)]" />
                <img src="https://aiautobase.com/images/testimonials/testimonial-3.webp" alt="Community testimonial 2" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-[0_15px_45px_rgba(91,63,255,0.16)]" />
                <img src="https://aiautobase.com/images/testimonials/testimonial-4.webp" alt="Community testimonial 3" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-[0_15px_45px_rgba(91,63,255,0.16)]" />
                <div className="flex h-12 min-w-[3rem] items-center justify-center rounded-full bg-[#5b3fff] px-4 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(91,63,255,0.16)]">+8k</div>
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">6,000+</span> communities scaling weekly
              </p>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-[0_24px_80px_rgba(91,63,255,0.12)]">
                <div className="text-4xl font-semibold text-[#5b3fff]">{count60}s</div>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">Strategy Ready</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-[0_24px_80px_rgba(91,63,255,0.12)]">
                <div className="text-4xl font-semibold text-[#5b3fff]">{count100}%</div>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">Copy-Paste Ready</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-[0_24px_80px_rgba(91,63,255,0.12)]">
                <div className="text-4xl font-semibold text-[#5b3fff]">{count7}</div>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">Content Days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What You Get Section */}
      <section id="features" className="bg-light py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-dark mb-4 leading-tight">
              Powerful Growth Tools for Every <span className="text-primary">Community Stage</span>
            </h2>
            <p className="text-center text-gray-600 text-base sm:text-lg md:text-lg max-w-2xl mx-auto">
              From launch to scaling, our comprehensive toolkit has everything you need to grow your Skool community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Keywords Card */}
            <Link href="/keywords">
              <div className="glass hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105 hover:-translate-y-2 rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-primary/30 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-700 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    📊
                  </div>
                  <span className="bg-gradient-to-r from-primary/20 to-purple-700/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/30">Popular</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2 flex-grow">Keywords & Search Terms</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">Discover 8-10 targeted search terms your audience uses.</p>
                <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg active:scale-95 transform hover:scale-105" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                  Try Now
                </button>
              </div>
            </Link>

            {/* Descriptions Card */}
            <Link href="/descriptions">
              <div className="glass hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105 hover:-translate-y-2 rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-primary/30 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-700 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    ✍️
                  </div>
                  <span className="bg-gradient-to-r from-primary/20 to-purple-700/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/30">Popular</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2 flex-grow">Community Descriptions</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">Generate compelling short taglines and long-form copy.</p>
                <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg active:scale-95 transform hover:scale-105" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                  Try Now
                </button>
              </div>
            </Link>

            {/* Content Plan Card */}
            <Link href="/generate-content-plan">
              <div className="glass hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105 hover:-translate-y-2 rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-primary/30 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-700 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    📅
                  </div>
                  <span className="bg-gradient-to-r from-primary/20 to-purple-700/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/30">Popular</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2 flex-grow">7-Day Content Plan</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">Customized, high-engagement content tailored to your niche and goals.</p>
                <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg active:scale-95 transform hover:scale-105" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                  Try Now
                </button>
              </div>
            </Link>

            {/* Banner Analysis Card */}
            <Link href="/banner-analysis">
              <div className="glass hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105 hover:-translate-y-2 rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-primary/30 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-700 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    📊
                  </div>
                  <span className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-400">Popular</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2 flex-grow">Banner Analysis</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">Get professional feedback on banner design quality and effectiveness.</p>
                <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg active:scale-95 transform hover:scale-105" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                  Try Now
                </button>
              </div>
            </Link>

            {/* Marketing Strategies Card */}
            <Link href="/marketing-strategies">
              <div className="glass hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105 hover:-translate-y-2 rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-primary/30 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-700 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    📈
                  </div>
                  <span className="bg-gradient-to-r from-primary/20 to-purple-700/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/30">Popular</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2 flex-grow">Marketing Strategies</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">Generate a personalized growth strategy tailored to your niche and audience.</p>
                <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg active:scale-95 transform hover:scale-105" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                  Try Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Generate Strategy Now Section */}
      <section id="generate-strategy" className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950 mb-4 leading-tight">
              Generate Your Strategy <span className="text-[#5b3fff]">Now</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              Fill in a few details about your community and get a personalized growth strategy in seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 max-w-5xl mx-auto">
            <form onSubmit={handleStrategySubmit} className="bg-white rounded-[32px] p-8 shadow-[0_24px_80px_rgba(91,63,255,0.12)] border border-slate-200 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-950 mb-2">Community Name</label>
                <input name="communityName" value={strategyForm.communityName} onChange={handleStrategyChange} required className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="e.g. Growth Lab" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-950 mb-2">Niche</label>
                <input name="niche" value={strategyForm.niche} onChange={handleStrategyChange} required className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="e.g. AI automation" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-950 mb-2">Target Audience</label>
                <input name="targetAudience" value={strategyForm.targetAudience} onChange={handleStrategyChange} required className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="e.g. early-stage founders" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-950 mb-2">Stage</label>
                  <select name="stage" value={strategyForm.stage} onChange={handleStrategyChange} className="w-full rounded-xl border border-slate-300 px-4 py-3">
                    <option value="launch">Just Launching</option>
                    <option value="growth">Growing</option>
                    <option value="scale">Scaling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-950 mb-2">Budget</label>
                  <select name="budget" value={strategyForm.budget} onChange={handleStrategyChange} className="w-full rounded-xl border border-slate-300 px-4 py-3">
                    <option value="organic">Organic Only</option>
                    <option value="paid">Paid Only</option>
                    <option value="both">Organic + Paid</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={strategyLoading} className="w-full inline-flex items-center justify-center rounded-full bg-[#5b3fff] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_24px_80px_rgba(91,63,255,0.20)] transition duration-300 hover:bg-[#4b39f9] disabled:opacity-60">
                {strategyLoading ? 'Generating...' : 'Generate Strategy Now'}
              </button>
              {strategyError ? <p className="text-sm text-red-600">{strategyError}</p> : null}
            </form>

            <div className="space-y-6">
              {strategyResult ? (
                <div className="bg-white rounded-[32px] p-8 shadow-[0_24px_80px_rgba(91,63,255,0.12)] border border-slate-200 space-y-6 max-h-[600px] overflow-y-auto">
                  {strategyResult.recommendedOrganic.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 mb-3">Recommended Organic Tactics</h3>
                      <ul className="space-y-3">
                        {strategyResult.recommendedOrganic.map((item, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="text-[#5b3fff] flex-shrink-0">✓</span>
                            <div>
                              <p className="font-semibold text-slate-950">{item.title}</p>
                              <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {strategyResult.recommendedPaid.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 mb-3">Recommended Paid Tactics</h3>
                      <ul className="space-y-3">
                        {strategyResult.recommendedPaid.map((item, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="text-[#5b3fff] flex-shrink-0">★</span>
                            <div>
                              <p className="font-semibold text-slate-950">{item.title}</p>
                              <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-3">Roadmap</h3>
                    <div className="space-y-4">
                      {strategyResult.roadmap.map((phase, idx) => (
                        <div key={idx} className="border-l-2 border-[#5b3fff]/30 pl-4">
                          <p className="text-sm font-bold text-[#5b3fff]">{phase.phase} · {phase.timeframe} · {phase.focus}</p>
                          <ul className="mt-1 space-y-1">
                            {phase.actions.map((action, aIdx) => (
                              <li key={aIdx} className="text-sm text-slate-500">• {action}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#5b3fff]/5 to-purple-100 p-8 rounded-[32px] border border-[#5b3fff]/20">
                  <h3 className="text-2xl font-bold text-slate-950 mb-4">What you'll get</h3>
                  <ul className="space-y-3 text-slate-600">
                    <li>• Organic and paid tactics ranked for your community's stage</li>
                    <li>• A phased roadmap from week one to month three</li>
                    <li>• Bonus tips tailored to your niche and audience</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-8 md:py-12 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl md:text-5xl font-semibold text-dark mb-16">
            Why choose us
          </h2>

          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-5 text-sm text-slate-600">
              <div className="border-b border-gray-200 sm:border-r">
                <div className="h-14 flex items-center px-4 text-xs uppercase tracking-[0.24em] font-semibold text-white bg-[rgb(91,63,255)] border-b border-gray-200">
                  Category
                </div>
                <div className="h-14 flex items-center px-4 border-b border-gray-200">
                  Speed to Results
                </div>
                <div className="h-14 flex items-center px-4 border-b border-gray-200">
                  Cost
                </div>
                <div className="h-14 flex items-center px-4">
                  Output
                </div>
              </div>

              <div className="border-b border-gray-200 sm:border-r">
                <div className="h-14 flex items-center justify-center px-3 text-xs uppercase tracking-[0.24em] font-semibold text-white bg-[rgb(91,63,255)]">
                  Skooler
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200 text-[#5b3fff] font-semibold">
                  Seconds
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200 text-[#5b3fff] font-semibold">
                  Affordable
                </div>
                <div className="h-14 flex items-center justify-center px-3 text-[#5b3fff] font-semibold">
                  Unlimited
                </div>
              </div>

              <div className="border-b border-gray-200 sm:border-r bg-slate-50">
                <div className="h-14 flex items-center justify-center px-3 text-xs uppercase tracking-[0.24em] font-semibold text-white bg-[rgb(91,63,255)]">
                  Freelancer
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200">
                  2-4 weeks
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200">
                  $500 - $5k
                </div>
                <div className="h-14 flex items-center justify-center px-3">
                  Fixed packages
                </div>
              </div>

              <div className="border-b border-gray-200 sm:border-r">
                <div className="h-14 flex items-center justify-center px-3 text-xs uppercase tracking-[0.24em] font-semibold text-white bg-[rgb(91,63,255)]">
                  Agency
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200">
                  4-12 weeks
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200">
                  $2k - $10k
                </div>
                <div className="h-14 flex items-center justify-center px-3">
                  By project/long
                </div>
              </div>

              <div>
                <div className="h-14 flex items-center justify-center px-3 text-xs uppercase tracking-[0.24em] font-semibold text-white bg-[rgb(91,63,255)]">
                  In-House
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200">
                  3-6 months
                </div>
                <div className="h-14 flex items-center justify-center px-3 border-b border-gray-200">
                  $5k - $20k+/mo
                </div>
                <div className="h-14 flex items-center justify-center px-3">
                  Full-time focus
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-dark mb-4 leading-tight">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Get your complete growth strategy in just 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="glass text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-200 hover:border-primary/20">
              <div className="bg-gradient-to-br from-primary to-purple-700 text-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-lg">
                1
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg md:text-xl">Tell Us About Your Community</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Community name, niche, description, target audience</p>
            </div>

            <div className="glass text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-200 hover:border-primary/20">
              <div className="bg-gradient-to-br from-primary to-purple-700 text-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-lg">
                2
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg md:text-xl">AI Analyzes Your Niche</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Smart recommendations based on your specific community</p>
            </div>

            <div className="glass text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-200 hover:border-primary/20">
              <div className="bg-gradient-to-br from-primary to-purple-700 text-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-lg">
                3
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg md:text-xl">Get Your Strategy</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Keywords, descriptions, content plan in 60 seconds</p>
            </div>

            <div className="glass text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-200 hover:border-primary/20">
              <div className="bg-gradient-to-br from-primary to-purple-700 text-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-lg">
                4
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg md:text-xl">Copy & Launch</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Paste directly into your Skool community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#4d00e5] py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/80">
              Choose the plan that fits your needs. Unlock powerful tools and strategies.
            </p>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <div className="rounded-[10px] border max-w-[400px]  border-white/10 bg-white p-6 shadow-[0_20px_60px_rgba(15,9,69,0.15)] text-slate-950">
              <div className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-400">Monthly</div>
              <h3 className="text-2xl font-bold mb-2">Perfect for a great beginning.</h3>
              <p className="mb-5 text-slate-500 text-sm">Start with a lightweight plan and access everything you need to launch fast.</p>
              <div className="mb-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#5b3fff]">$5</span>
                <span className="text-base text-slate-500">/month</span>
              </div>
              <a
                href="https://whop.com/skooler/skooler-basic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#5b3fff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4a24f0]"
              >
                Get Started
              </a>
              <div className="mt-6 space-y-3 text-slate-700 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[#5b3fff] text-xl">✓</span>
                  <span>Unlimited strategies</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#5b3fff] text-xl">✓</span>
                  <span>Keywords & descriptions</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#5b3fff] text-xl">✓</span>
                  <span>7-day content plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#5b3fff] text-xl">✓</span>
                  <span>Email support</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden max-w-[400px] rounded-[10px] bg-[#5b3fff] p-6 shadow-[0_20px_60px_rgba(15,9,69,0.2)]">
              <div className="absolute top-0 right-0 -mr-6 -mt-6">
                <div className="rounded-bl-[1.75rem] bg-white/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-white">
                  Best Value
                </div>
              </div>
              <div className="relative z-10">
                <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/75">Lifetime</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Pay once, own forever.</h3>
                <p className="mb-5 text-white/80 text-sm">Everything included for ongoing growth at a single one-time price.</p>
                <div className="mb-5 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">$20</span>
                  <span className="text-base text-white/80">one time</span>
                </div>
                <a
                  href="https://whop.com/skooler/skooler-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#5b3fff] transition hover:bg-white/90"
                >
                  Get Lifetime Access
                </a>
                <div className="mt-6 space-y-3 text-white/90 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xl">✓</span>
                    <span>Unlimited strategies forever</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xl">✓</span>
                    <span>All features included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xl">✓</span>
                    <span>Priority 24/7 support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xl">✓</span>
                    <span>Advanced analytics reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-white/80">
            All plans include a 14-day free trial. No credit card required.
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-light py-8 md:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-dark mb-4 leading-tight">
              What Community Owners Say
            </h2>
            <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Real feedback from people using Skooler to grow their communities
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden py-6">
            <div className="carousel-track" style={{
              display: 'flex',
              gap: '24px',
              perspective: '1200px'
            }}>
              {/* Testimonial 1 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "I generated my entire launch strategy in 60 seconds. The keywords alone saved me hours of research. My community grew from 0 to 50 engaged."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://aiautobase.com/images/testimonials/testimonial-2.webp" alt="Sarah Chen" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Sarah Chen</div>
                      <div className="text-xs text-gray-600">Founder, Design Masters</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "The 7-day content plan is genius. I just copy-pasted the posts and my community started having real conversations from day one. This is how growth should work."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://aiautobase.com/images/testimonials/testimonial-3.webp" alt="Marcus Rodriguez" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Marcus Rodriguez</div>
                      <div className="text-xs text-gray-600">Community Lead, Indie Hackers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "Finally, something built specifically for Skool communities. The descriptions were ready to paste, the strategy was niche-specific, and my members got it immediately."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://aiautobase.com/images/testimonials/testimonial-4.webp" alt="Jessica Kim" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Jessica Kim</div>
                      <div className="text-xs text-gray-600">Owner, Copywriting Collective</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "As a non-technical founder, I was worried about implementation. But Skooler made everything so simple. My team productivity has increased significantly."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://aiautobase.com/images/testimonials/testimonial-5.webp" alt="Emily Watson" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Emily Watson</div>
                      <div className="text-xs text-gray-600">CEO at InnovateLab</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "Best investment for my community. The keywords helped me rank better, the descriptions sold the value proposition, and members loved the content plan."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://cdn.senja.io/public/media/82821b6d-0a58-44f5-87ee-a10c4a61cc98_45425cca-0acd-40ae-bd6a-e2876bda0f89_1726469044386.jpeg?width=63&height=63&format=webp" alt="David Kumar" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">David Kumar</div>
                      <div className="text-xs text-gray-600">Growth Manager, Tech Academy</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "Within weeks, my engagement rates tripled. The content calendar alone made my life easier, and members keep coming back for more."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://cdn.senja.io/public/media/621fd10a-e6ce-48d2-9dd2-ed4b2a06c7c2_5c7b020d-d19c-4d41-b7b6-2d9ba879fc96_1682811464292.jpeg?width=63&height=63&format=webp" alt="Alex Park" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Alex Park</div>
                      <div className="text-xs text-gray-600">Digital Coach, StartupHub</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 7 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "The ROI was immediate. I spent less than an hour setting up and my community had momentum from day one. Highly recommended!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-gradient-to-br from-amber-400 to-primary flex items-center justify-center text-white font-bold text-sm">
                      NJ
                    </div>
                    <div>
                      <div className="font-semibold text-dark">Nicole Johnson</div>
                      <div className="text-xs text-gray-600">Wellness Coach, MindfulLiving</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 8 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "This tool saved me hundreds of hours of planning. My members are more engaged, the culture is stronger, and growth is natural."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-gradient-to-br from-orange-400 to-primary flex items-center justify-center text-white font-bold text-sm">
                      RG
                    </div>
                    <div>
                      <div className="font-semibold text-dark">Rachel Green</div>
                      <div className="text-xs text-gray-600">Community Manager, CreativeHub</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 9 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "Perfect for creators looking to scale. The strategy framework is solid, and my members love the thoughtfulness behind it."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-gradient-to-br from-green-400 to-primary flex items-center justify-center text-white font-bold text-sm">
                      TM
                    </div>
                    <div>
                      <div className="font-semibold text-dark">Thomas Martinez</div>
                      <div className="text-xs text-gray-600">Founder, BuildersCollective</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 10 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "The transformation has been incredible. My community went from struggling to thriving in just 30 days. This is a game-changer."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://aiautobase.com/images/testimonials/testimonial-2.webp" alt="Jennifer Lee" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Jennifer Lee</div>
                      <div className="text-xs text-gray-600">Brand Strategist, LuminosBrand</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 11 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "I can't recommend this enough. It's saved me countless hours and my community has never been more engaged. Absolutely worth it!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://aiautobase.com/images/testimonials/testimonial-3.webp" alt="Michael Santos" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Michael Santos</div>
                      <div className="text-xs text-gray-600">Entrepreneur, TechVentures</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 12 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "Exceptional tool with outstanding support. The attention to detail shows in every feature. My community's growth speaks for itself!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://aiautobase.com/images/testimonials/testimonial-4.webp" alt="Sophia Anderson" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Sophia Anderson</div>
                      <div className="text-xs text-gray-600">Community Builder, LeadershipAcademy</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 13 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "Game-changing platform! Took me from zero community to hundreds of engaged members. The strategy is foolproof and easy to implement."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <img src="https://cdn.senja.io/public/media/82821b6d-0a58-44f5-87ee-a10c4a61cc98_45425cca-0acd-40ae-bd6a-e2876bda0f89_1726469044386.jpeg?width=63&height=63&format=webp" alt="Christopher Hayes" className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 object-cover" />
                    <div>
                      <div className="font-semibold text-dark">Christopher Hayes</div>
                      <div className="text-xs text-gray-600">CEO, InnovateTech Solutions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 14 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "The best investment for my community business. ROI is incredible. My members are happier and more engaged than ever before!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 overflow-hidden flex items-center justify-center text-white font-bold text-sm" style={{background: 'linear-gradient(135deg, #6160ff, #6e39e7)'}}>
                      KB
                    </div>
                    <div>
                      <div className="font-semibold text-dark">Katherine Brown</div>
                      <div className="text-xs text-gray-600">Founder, EmpowerWomen Co</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 15 */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "Highly recommend to anyone building a community. The framework is proven and the support team is amazing. Worth every penny!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 overflow-hidden flex items-center justify-center text-white font-bold text-sm" style={{background: 'linear-gradient(135deg, #6160ff, #6e39e7)'}}>
                      JW
                    </div>
                    <div>
                      <div className="font-semibold text-dark">James Wilson</div>
                      <div className="text-xs text-gray-600">Digital Agency Owner, WebtechPro</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duplicate for seamless loop */}
              <div className="carousel-item flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:h-[320px] bg-white/50 backdrop-blur-2xl border-2 border-primary/70 hover:border-primary rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-visible group animate-float-slow hover:animate-bounce-slow" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="absolute -top-2 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl group-hover:from-yellow-300/50 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-5 star-rating-container">
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                    <span className="text-yellow-400 text-3xl drop-shadow-lg star-icon">★</span>
                  </div>
                  <p className="text-dark mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                    "I generated my entire launch strategy in 60 seconds. The keywords alone saved me hours of research. My community grew from 0 to 50 engaged members in one week."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/30">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-gradient-to-br from-purple-400 to-primary flex items-center justify-center text-white font-bold text-lg">
                      SC
                    </div>
                    <div>
                      <div className="font-semibold text-dark">Sarah Chen</div>
                      <div className="text-xs text-gray-600">Founder, Design Masters</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes carousel {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-calc(33.333% + 24px));
            }
          }

          @keyframes float-slow {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @keyframes star-pulse {
            0%, 100% {
              filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.8)) drop-shadow(0 0 8px rgba(250, 204, 21, 0.4));
              transform: scale(1);
            }
            50% {
              filter: drop-shadow(0 0 12px rgba(250, 204, 21, 1)) drop-shadow(0 0 16px rgba(250, 204, 21, 0.6));
              transform: scale(1.08);
            }
          }

          .carousel-track {
            animation: carousel 60s linear infinite;
          }

          .carousel-item {
            box-shadow: 0 8px 32px rgba(110, 57, 231, 0.15);
            border-color: rgba(110, 57, 231, 0.7);
          }

          .carousel-item:hover {
            box-shadow: 0 8px 32px rgba(110, 57, 231, 0.35), 0 0 20px rgba(110, 57, 231, 0.2), inset 0 1px 2px rgba(110, 57, 231, 0.1);
            transform: translateY(-2px);
            border-color: rgba(110, 57, 231, 1);
          }

          .animate-float-slow {
            animation: float-slow 3s ease-in-out infinite;
          }

          .hover\:animate-bounce-slow:hover {
            animation: bounce-slow 1.5s ease-in-out;
          }

          .star-icon {
            animation: star-pulse 2.5s ease-in-out infinite;
          }

          .star-rating-container {
            animation: none;
          }

          .carousel-item:hover .star-icon {
            animation: star-pulse 1.8s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* FAQs - Accordion Style */}
      <section className="py-8 md:py-12 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-dark mb-4 leading-tight">
              Frequently Asked <span className="text-primary">Questions (FAQs)</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Find answers to common questions about Skooler and how it can help grow your community.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                {/* Question Header */}
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                  className={`w-full px-6 sm:px-8 py-5 sm:py-6 text-left font-bold text-base sm:text-lg md:text-xl transition-all duration-300 flex items-center justify-between ${
                    expandedFAQ === index
                      ? 'bg-gradient-to-r from-primary to-purple-700 text-light'
                      : 'bg-white text-dark hover:bg-gray-50'
                  }`}
                >
                  <span className="flex-grow">{faq.question}</span>
                  <span className={`ml-4 text-2xl font-light transition-transform duration-300 flex-shrink-0 ${
                    expandedFAQ === index ? 'rotate-180' : ''
                  }`}>
                    {expandedFAQ === index ? '−' : '+'}
                  </span>
                </button>

                {/* Answer - Expandable */}
                {expandedFAQ === index && (
                  <div className="bg-gradient-to-r from-primary/5 to-purple-700/5 border-t-2 border-primary/10 px-6 sm:px-8 py-6 sm:py-8 animate-in fade-in duration-300">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ Footer CTA */}
          <div className="mt-12 md:mt-8 p-8 md:p-12 bg-primary/10 rounded-2xl border border-primary/20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-dark mb-3">Still have questions?</h3>
            <p className="text-gray-600 text-base md:text-lg mb-6">Can't find the answer you're looking for? Contact our support team.</p>
            <Link href="/contact" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 text-dark py-8 md:py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48 blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/15 rounded-full -ml-36 -mb-36 blur-3xl animate-pulse-soft"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="text-dark">Ready to Grow Your</span>{' '}<span className="text-primary">Community?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-lg mb-8 max-w-2xl mx-auto animate-fade-in-up text-dark">
            Generate your complete growth strategy in <span className="font-bold text-primary">60 seconds</span>. <span className="font-semibold text-primary">No credit card needed.</span>
          </p>
          <Link href="/" className="inline-block bg-primary text-light px-8 md:px-10 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 text-base md:text-lg animate-fade-in-up shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95" style={{perspective: '1000px', transformStyle: 'preserve-3d', transform: 'translateZ(0px) rotateX(0deg)'}}>
            Generate Your Strategy Now
          </Link>
        </div>
      </section>

      {/* Fixed Instagram Icon Button with Tooltip */}
      <div
        className="fixed bottom-8 right-8 z-40"
        onMouseEnter={() => setShowInstagramTooltip(true)}
        onMouseLeave={() => setShowInstagramTooltip(false)}
      >
        <a
          href="https://www.instagram.com/skoolers.online?igsh=MWtkYXN2dTczMnlr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:scale-110 transition"
          title="Follow us on Instagram"
        >
          <img
            src="/insta-icon-optimized-ivxYtBP0.webp"
            alt="Instagram"
            className="w-16 h-16 drop-shadow-lg cursor-pointer"
          />
        </a>

        {/* Tooltip Message */}
        {showInstagramTooltip && (
          <div className="absolute bottom-24 right-0 bg-primary text-light px-4 py-3 rounded-lg shadow-lg whitespace-nowrap border border-primary/20 animate-fade-in">
            <div className="flex items-center gap-2">
              <span>📩</span>
              <span className="text-sm font-medium">If you need any help or have questions, feel free to DM me.</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-light border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo.svg" alt="Skooler" className="w-8 h-8" />
            <div className="text-lg font-bold text-[rgb(91,63,255)]">Skooler</div>
          </div>
          <p className="text-center text-gray-600">© 2026 Skooler Partner. Built for community owners.</p>
        </div>
      </footer>
    </div>
    </>
  )
}

