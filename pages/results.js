import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Results() {
  const router = useRouter()
  const [data, setData] = useState(null)
  const [communityInfo, setCommunityInfo] = useState(null)
  const [copied, setCopied] = useState({})

  useEffect(() => {
    const recommendations = sessionStorage.getItem('recommendations')
    const info = sessionStorage.getItem('communityInfo')

    if (!recommendations || !info) {
      router.push('/')
      return
    }

    setData(JSON.parse(recommendations))
    setCommunityInfo(JSON.parse(info))
  }, [router])

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied((prev) => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [id]: false }))
    }, 2000)
  }

  if (!data || !communityInfo) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading your strategy...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-light border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start mb-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
              <span className="text-xl font-bold text-[rgb(91,63,255)]">Skooler</span>
            </Link>
            <Link href="/">
              <button className="px-4 py-2 text-dark hover:text-primary border border-primary rounded-lg transition">
                ← Back
              </button>
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark">Your Growth Strategy</h1>
            <p className="text-gray-600 mt-1">{communityInfo.communityName}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Keywords Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-dark mb-2">🎯 Keywords & Search Terms</h2>
            <p className="text-gray-600">Use these when setting up your Skool community description and on your landing page.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.keywords.map((keyword, idx) => (
                <div key={idx} className="flex items-center justify-between bg-light border border-gray-200 rounded-lg p-4">
                  <span className="text-dark font-medium">{keyword}</span>
                  <button
                    onClick={() => copyToClipboard(keyword, `keyword-${idx}`)}
                    className="text-primary hover:opacity-80 text-sm font-semibold"
                  >
                    {copied[`keyword-${idx}`] ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Short Description */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-dark mb-2">📌 Short Description</h2>
            <p className="text-gray-600">10-15 words for your Skool community banner and tagline.</p>
          </div>
          <div className="bg-gradient-to-br from-primary to-purple-900 bg-opacity-10 rounded-lg p-6 border border-primary border-opacity-30">
            <p className="text-lg text-dark font-medium mb-4">{data.short_description}</p>
            <button
              onClick={() => copyToClipboard(data.short_description, 'short')}
              className="px-4 py-2 bg-primary hover:opacity-90 text-light font-semibold rounded-lg transition"
            >
              {copied['short'] ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </section>

        {/* Long Description */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-dark mb-2">📖 Long Description</h2>
            <p className="text-gray-600">For your Skool community About page. Ready to paste.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-dark whitespace-pre-wrap leading-relaxed mb-4">{data.long_description}</p>
            <button
              onClick={() => copyToClipboard(data.long_description, 'long')}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-light font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}
            >
              {copied['long'] ? '✓ Copied' : 'Copy to Clipboard'}
            </button>
          </div>
        </section>

        {/* Content Plan */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-dark mb-2">📅 7-Day Content Plan</h2>
            <p className="text-gray-600">Ready-to-publish posts for your launch week. Copy and paste directly into Skool.</p>
          </div>

          <div className="space-y-6">
            {data.content_plan.map((post, idx) => (
              <div key={idx} className="bg-light border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary via-purple-600 to-purple-900 bg-opacity-10 border-b border-primary border-opacity-30 px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">Day {post.day}</div>
                      <h3 className="text-xl font-bold text-dark">{post.title}</h3>
                      <div className="mt-2 inline-block bg-light border border-primary border-opacity-30 text-xs font-medium text-primary px-2 py-1 rounded">
                        {post.post_type}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(post.body, `post-${idx}`)}
                      className="text-primary hover:opacity-80 font-semibold text-sm whitespace-nowrap ml-4"
                    >
                      {copied[`post-${idx}`] ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-dark whitespace-pre-wrap leading-relaxed">{post.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Recommendations */}
        <section className="mb-12 bg-gradient-to-br from-primary to-purple-900 bg-opacity-5 rounded-lg p-8 border border-primary border-opacity-20">
          <h2 className="text-2xl font-bold text-dark mb-4">💡 Quick Growth Tips</h2>
          <ul className="space-y-3 text-dark">
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">→</span>
              <span><strong>Post consistently:</strong> Publish one of these posts per day during your launch week. Consistency builds early momentum.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">→</span>
              <span><strong>Engage immediately:</strong> Respond to the first comments within an hour. Early engagement signals an active community.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">→</span>
              <span><strong>Use these keywords:</strong> Weave the keywords into your About section, posts, and discussions naturally.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">→</span>
              <span><strong>Ask for introductions:</strong> Encourage members to introduce themselves. It builds connection faster than anything else.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">→</span>
              <span><strong>Track what works:</strong> Notice which post types get the most engagement. Double down on those.</span>
            </li>
          </ul>
        </section>

        {/* Export & Next Steps */}
        <section className="mb-12">
          <div className="bg-primary text-light rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            <ol className="space-y-3 text-light/90">
              <li><span className="font-semibold">1. Update your About page</span> with the long description.</li>
              <li><span className="font-semibold">2. Create a banner</span> using your short description and the tone of your brand.</li>
              <li><span className="font-semibold">3. Schedule these 7 posts</span> or publish them manually over your launch week.</li>
              <li><span className="font-semibold">4. Invite your first 10-20 members</span> directly—a small engaged group beats a big inactive one.</li>
              <li><span className="font-semibold">5. Track engagement</span> on each post type. Plan next week's content based on what resonates.</li>
            </ol>
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center py-8">
          <Link href="/">
            <button className="px-6 py-3 text-light bg-primary hover:opacity-90 font-semibold rounded-lg transition">
              Create Another Strategy
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/logo.svg" alt="Skooler" className="w-7 h-7" />
            <div className="text-sm font-bold text-[rgb(91,63,255)]">Skooler</div>
          </div>
          <p className="text-center text-sm text-gray-600">Questions? Iterate on your strategy as you learn more about your audience.</p>
        </div>
      </footer>
    </div>
  )
}
