# Skool.Online Partner - MVP

An AI-powered platform that generates complete growth strategies for Skool community owners.

## What It Does

Input your community details (name, niche, description, target audience) and get:
- **8-10 research-backed keywords** tailored to your niche
- **Short & long descriptions** optimized for Skool's platform
- **7-day content plan** with ready-to-publish posts
- **Growth tips** for launching and scaling your community

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

### Production Build

```bash
npm run build
npm start
```

## How to Use

1. **Enter your community details:**
   - Community name
   - Niche (e.g., "Copywriting", "AI Tools", "Indie Hacking")
   - Description of your community's unique approach
   - Target audience profile

2. **Get your strategy:**
   - Keywords for SEO and community discovery
   - Optimized descriptions ready to paste into Skool
   - 7-day launch content plan
   - Growth tips and next steps

3. **Implement immediately:**
   - Copy descriptions to your Skool About page
   - Schedule the 7-day content plan
   - Invite your first members
   - Track engagement and iterate

## Tech Stack

- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes
- **Storage:** SessionStorage (client-side, no database needed for MVP)

## Project Structure

```
├── pages/
│   ├── _app.js              # App wrapper with global styles
│   ├── index.js             # Home page with input form
│   ├── results.js           # Results page displaying strategy
│   └── api/
│       └── generate.js      # Backend API for recommendations
├── styles/
│   └── globals.css          # Global Tailwind styles
├── public/                  # Static assets (if any)
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json
```

## Key Features

✅ **Light theme** - Clean, professional interface
✅ **One-page workflow** - From input to results in seconds
✅ **Copy-to-clipboard** - All content is easily copyable
✅ **Mobile-responsive** - Works on all devices
✅ **Niche-specific** - Generates targeted, not generic, content
✅ **No database** - Uses client-side storage (ready to add backend later)

## Future Enhancements

- User accounts and saved strategies
- Advanced analytics on content performance
- Integration with Skool API
- AI-powered banner design
- Community growth benchmark comparisons
- Paid tier with priority support

## Notes

This is an MVP. The recommendation engine uses deterministic templates that should be enhanced with:
- Large Language Model (LLM) integration for more dynamic content
- Real keyword research data
- A/B testing data to optimize templates
- User feedback loops to improve suggestions

## License

MIT
