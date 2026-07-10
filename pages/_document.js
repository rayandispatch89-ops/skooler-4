import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Manrope Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Favicon */}
        <link rel="icon" href="/logo.svg?v=2" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/logo.svg?v=2" />
        <link rel="apple-touch-icon" href="/logo.svg?v=2" />

        {/* Meta Tags */}
        <meta charSet="utf-8" />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Skooler - Generate proven growth strategies for your Skool community in 60 seconds. AI-powered keywords, descriptions, 7-day content plans, and marketing strategies."
        />
        <meta
          name="keywords"
          content="Skool, community growth, growth strategy, content plan, keywords, community building"
        />
        <meta name="author" content="Skooler" />

        {/* Open Graph Tags (for social media) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skool.online" />
        <meta property="og:title" content="Skooler - AI Community Growth Strategies" />
        <meta
          property="og:description"
          content="Generate proven growth strategies for your Skool community in 60 seconds. AI-powered keywords, descriptions, 7-day content plans, and marketing strategies."
        />
        <meta property="og:image" content="/logo.svg" />

        {/* Twitter Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://skool.online" />
        <meta property="twitter:title" content="Skooler - AI Community Growth Strategies" />
        <meta
          property="twitter:description"
          content="Generate proven growth strategies for your Skool community in 60 seconds. AI-powered keywords, descriptions, 7-day content plans, and marketing strategies."
        />
        <meta property="twitter:image" content="/logo.svg" />

        {/* Theme Color */}
        <meta name="theme-color" content="#6e39e7" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
