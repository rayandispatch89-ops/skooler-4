import Link from 'next/link'

export default function ContentPlanFeature() {
  return (
    <div className="min-h-screen bg-light">
      {/* Navigation */}
      <nav className="bg-light border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skool.Online" className="w-10 h-10" />
            <div className="text-2xl font-bold text-primary">Skool.Online</div>
          </Link>
          <Link href="/" className="text-dark hover:text-primary">← Back to Home</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-4xl mb-6">
            📅
          </div>
          <h1 className="text-5xl font-bold text-dark mb-6">
            7-Day Content Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Seven ready-to-publish posts designed to launch your community with momentum. Copy, paste, and watch engagement happen.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">✨ What You Get</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary text-xl">✓</span>
                <div>
                  <div className="font-semibold text-dark">7 Varied Post Types</div>
                  <div className="text-gray-600">Welcome, value tips, questions, social proof, polls, behind-the-scenes, CTAs</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-xl">✓</span>
                <div>
                  <div className="font-semibold text-dark">Ready to Publish</div>
                  <div className="text-gray-600">Copy-paste directly into Skool—no editing needed</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-xl">✓</span>
                <div>
                  <div className="font-semibold text-dark">Engagement Designed</div>
                  <div className="text-gray-600">Each post is structured to spark conversations</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-xl">✓</span>
                <div>
                  <div className="font-semibold text-dark">Fully Customizable</div>
                  <div className="text-gray-600">Edit and adjust to match your tone and style</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
            <h2 className="text-2xl font-bold text-dark mb-6">📈 How It Works</h2>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-primary mb-1">Step 1: Input Your Info</div>
                <p className="text-gray-600">Tell us about your community and niche</p>
              </div>
              <div>
                <div className="font-semibold text-primary mb-1">Step 2: AI Generation</div>
                <p className="text-gray-600">We create 7 posts optimized for your audience</p>
              </div>
              <div>
                <div className="font-semibold text-primary mb-1">Step 3: Get Plan</div>
                <p className="text-gray-600">Receive all 7 posts in your results page</p>
              </div>
              <div>
                <div className="font-semibold text-primary mb-1">Step 4: Launch</div>
                <p className="text-gray-600">Post one per day during your launch week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Preview */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-dark mb-8">📝 What's Included</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-light p-4 rounded border border-gray-200">
              <div className="text-sm font-bold text-primary mb-2">Day 1: Welcome</div>
              <p className="text-sm text-gray-600">Introduce your community and set the tone</p>
            </div>
            <div className="bg-light p-4 rounded border border-gray-200">
              <div className="text-sm font-bold text-primary mb-2">Day 2: Value/Tip</div>
              <p className="text-sm text-gray-600">Share a quick win your members can use</p>
            </div>
            <div className="bg-light p-4 rounded border border-gray-200">
              <div className="text-sm font-bold text-primary mb-2">Day 3: Question</div>
              <p className="text-sm text-gray-600">Spark engagement with an engaging question</p>
            </div>
            <div className="bg-light p-4 rounded border border-gray-200">
              <div className="text-sm font-bold text-primary mb-2">Day 4: Social Proof</div>
              <p className="text-sm text-gray-600">Share a member win or testimonial</p>
            </div>
            <div className="bg-light p-4 rounded border border-gray-200">
              <div className="text-sm font-bold text-primary mb-2">Day 5: Poll</div>
              <p className="text-sm text-gray-600">Get feedback and increase participation</p>
            </div>
            <div className="bg-light p-4 rounded border border-gray-200">
              <div className="text-sm font-bold text-primary mb-2">Day 6: Behind-the-Scenes</div>
              <p className="text-sm text-gray-600">Build connection through authenticity</p>
            </div>
            <div className="bg-light p-4 rounded border border-gray-200 col-span-2">
              <div className="text-sm font-bold text-primary mb-2">Day 7: Call-to-Action</div>
              <p className="text-sm text-gray-600">Guide your community to the next step</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-light rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Community?</h2>
          <p className="text-lg mb-8 opacity-90">Generate your complete growth strategy in 60 seconds</p>
          <Link href="/" className="bg-light text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 inline-block">
            Generate Content Plan Now
          </Link>
        </div>
      </main>

      {/* Footer */}
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
