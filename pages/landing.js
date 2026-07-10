import Link from 'next/link'

export default function Landing() {
  return (
    <div className="min-h-screen bg-light">
      {/* Navigation */}
      <nav className="bg-light border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">🚀 Skool Growth</div>
          <Link href="/" className="bg-primary text-light px-6 py-2 rounded hover:bg-opacity-90">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-light py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-dark mb-6">
              Your AI Partner for <span className="text-primary">Community Growth</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Get proven growth strategies for your Skool community in under 60 seconds. Keywords, content plans, descriptions—everything ready to paste.
            </p>
            <div className="flex gap-4">
              <Link href="/" className="bg-primary text-light px-8 py-3 rounded font-semibold hover:bg-opacity-90">
                Generate Strategy
              </Link>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded font-semibold hover:bg-primary hover:text-light transition">
                View Examples
              </button>
            </div>
            <div className="mt-12 flex gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-gray-600">Communities Generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">60s</div>
                <div className="text-gray-600">Strategy in Seconds</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-gray-600">Copy-Paste Ready</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-purple-900 rounded-lg p-12 h-96 flex items-center justify-center text-light">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl font-semibold">Ready-to-Launch Strategies</p>
              <p className="mt-4 text-sm opacity-90">Fill 4 fields. Get complete growth plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-dark mb-4 text-center">
            What You Get
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Complete growth strategy tailored to your community niche and audience.
          </p>

          <div className="grid grid-cols-3 gap-8">
            <div className="bg-light p-8 rounded-lg border border-gray-200 hover:border-primary transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-dark mb-3">Keywords & Search Terms</h3>
              <p className="text-gray-600">8-10 search terms your audience uses. Perfect for SEO, ads, and discovery.</p>
            </div>

            <div className="bg-light p-8 rounded-lg border border-gray-200 hover:border-primary transition">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-dark mb-3">Descriptions Ready to Paste</h3>
              <p className="text-gray-600">Short tagline and long-form copy for your Skool About page.</p>
            </div>

            <div className="bg-light p-8 rounded-lg border border-gray-200 hover:border-primary transition">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-dark mb-3">7-Day Content Plan</h3>
              <p className="text-gray-600">Ready-to-publish posts with different types for early engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-dark mb-12 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary text-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-dark mb-2">Tell Us About Your Community</h3>
              <p className="text-sm text-gray-600">Community name, niche, description, target audience</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-dark mb-2">AI Analyzes Your Niche</h3>
              <p className="text-sm text-gray-600">Smart recommendations based on your specific community</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-dark mb-2">Get Your Strategy</h3>
              <p className="text-sm text-gray-600">Keywords, descriptions, content plan in 60 seconds</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h3 className="font-bold text-dark mb-2">Copy & Launch</h3>
              <p className="text-sm text-gray-600">Paste directly into your Skool community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-light mb-8">Why Choose Skool Growth?</h2>
            <p className="text-light mb-8 opacity-90">
              Skool community owners need strategies that work—not generic templates. We understand your platform, your audience, and what drives real growth.
            </p>
            <Link href="/" className="bg-light text-primary px-8 py-3 rounded font-semibold hover:opacity-90 inline-block">
              Generate Your Strategy
            </Link>
          </div>

          <div className="space-y-6">
            <div className="bg-white bg-opacity-10 p-6 rounded text-light">
              <h3 className="font-bold mb-2">⚡ Fast & Specific</h3>
              <p className="text-sm opacity-90">Not generic advice. Tailored to your niche and audience in seconds.</p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded text-light">
              <h3 className="font-bold mb-2">📋 Ready to Use</h3>
              <p className="text-sm opacity-90">Copy to clipboard. Paste into Skool. Start growing today.</p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded text-light">
              <h3 className="font-bold mb-2">🎯 Built for Skool</h3>
              <p className="text-sm opacity-90">Strategies designed specifically for Skool communities, not generic platforms.</p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded text-light">
              <h3 className="font-bold mb-2">✨ AI-Powered</h3>
              <p className="text-sm opacity-90">Smart recommendations that understand your community dynamics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-dark mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded p-6 hover:border-primary transition cursor-pointer group">
              <h3 className="font-bold text-dark text-lg group-hover:text-primary">
                How long does it take to generate a strategy?
              </h3>
              <p className="text-gray-600 mt-2">Just 60 seconds. Fill 4 fields and get your complete growth strategy instantly.</p>
            </div>

            <div className="border border-gray-200 rounded p-6 hover:border-primary transition cursor-pointer group">
              <h3 className="font-bold text-dark text-lg group-hover:text-primary">
                Can I edit the generated content?
              </h3>
              <p className="text-gray-600 mt-2">Yes! All content is editable. Customize it to match your voice perfectly.</p>
            </div>

            <div className="border border-gray-200 rounded p-6 hover:border-primary transition cursor-pointer group">
              <h3 className="font-bold text-dark text-lg group-hover:text-primary">
                Is this really AI-powered?
              </h3>
              <p className="text-gray-600 mt-2">Yes. Our system analyzes your niche and audience to generate specific, actionable recommendations.</p>
            </div>

            <div className="border border-gray-200 rounded p-6 hover:border-primary transition cursor-pointer group">
              <h3 className="font-bold text-dark text-lg group-hover:text-primary">
                Do I need an account?
              </h3>
              <p className="text-gray-600 mt-2">Not for the MVP. Just fill out the form and get your strategy instantly.</p>
            </div>

            <div className="border border-gray-200 rounded p-6 hover:border-primary transition cursor-pointer group">
              <h3 className="font-bold text-dark text-lg group-hover:text-primary">
                What if I want to save my strategies?
              </h3>
              <p className="text-gray-600 mt-2">Coming soon! We're adding accounts and strategy storage in Phase 2.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 text-dark py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-dark">
            Ready to Grow Your Community?
          </h2>
          <p className="text-lg mb-8 text-dark">
            Generate your complete growth strategy in 60 seconds. No credit card needed.
          </p>
          <Link href="/" className="bg-primary text-light px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-all duration-300 inline-block transform hover:scale-105 active:scale-95" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}>
            Generate Your Strategy Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
          <p>© 2026 Skool Growth Partner. Built for community owners.</p>
        </div>
      </footer>
    </div>
  )
}
