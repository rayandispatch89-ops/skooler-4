# Customization Guide

This guide explains how to modify the platform to fit your specific needs.

## Changing the Recommendation Logic

The core recommendation engine is in `pages/api/generate.js`. It's designed to be easy to customize.

### Modify Keywords Generation

**Current behavior:** Generic keywords based on niche + audience

**To customize:**
```javascript
// In pages/api/generate.js, find the generateKeywords function

function generateKeywords(niche, targetAudience, description) {
  // Current: returns generic templates
  const keywordTemplates = [
    `${niche} community`,
    // ... etc
  ]
  
  // To customize, change these templates:
  const keywordTemplates = [
    `${niche} mastermind`,
    `learn ${niche} in 30 days`,
    `${niche} for ${targetAudience}`,
    // Add your own patterns
  ]
  return keywordTemplates.slice(0, 9)
}
```

### Modify Short Description

**Current behavior:** Generic 10-15 word tagline

**To customize:**
```javascript
// In generateShortDescription function

function generateShortDescription(niche, targetAudience, description) {
  // Current: returns fixed templates
  const templates = [
    `Get clear strategies and peer support to master ${niche} faster.`,
  ]
  
  // To customize: add more templates or use LLM
  const templates = [
    `${targetAudience}: master ${niche} without the overwhelm.`,
    `Real ${niche} wins from real people doing the work.`,
    `Your peer group for ${niche}—no fluff, only results.`,
  ]
  
  // Pick randomly or use LLM to generate
  return templates[Math.floor(Math.random() * templates.length)]
}
```

### Modify Long Description

**Current behavior:** 100-150 word About page copy following specific structure

**To customize:**
```javascript
// In generateLongDescription function

// Currently hardcoded structure:
// - For ${audience} who want...
// - Here's how it works...
// - What makes this different...
// - Join if you're ready...

// To customize with LLM (recommended for Phase 2):
async function generateLongDescription(communityName, niche, targetAudience, description) {
  const prompt = `Write a 100-150 word About page description for a Skool community:
  
  Community: ${communityName}
  Niche: ${niche}
  Target: ${targetAudience}
  Description: ${description}
  
  Keep it direct and practical, no generic fluff.`
  
  const response = await callClaudeAPI(prompt)
  return response.text
}
```

### Modify Content Plan

**Current behavior:** 7-day plan with specific post types

**To customize:**

1. **Change post types:**
   ```javascript
   const postTypes = [
     'welcome',
     'value/tip',
     'engagement question',
     'testimonial/social proof',
     'poll',
     'behind-the-scenes',
     'call-to-action'
   ]
   // Modify this array to change post types
   ```

2. **Customize specific posts:**
   ```javascript
   // Day 2 value/tip post
   {
     day: 2,
     post_type: 'value/tip',
     title: `One quick win you can implement today in ${niche}`,
     body: `// Currently generic body... customize here`
   }
   ```

3. **Add LLM generation for posts:**
   ```javascript
   async function generateContentPlan(communityName, niche, targetAudience, description) {
     const plan = []
     const postTypes = [...]
     
     for (let day = 1; day <= 7; day++) {
       const prompt = `Generate a ${postTypes[day-1]} post for a ${niche} community...`
       const post = await callClaudeAPI(prompt)
       plan.push({
         day,
         post_type: postTypes[day-1],
         title: post.title,
         body: post.body
       })
     }
     return plan
   }
   ```

## Changing the UI Design

### Update Colors

**Colors are in `tailwind.config.js`:**

```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',    // Change this blue
      secondary: '#64748b',  // Change this gray
    },
  },
}
```

**Tailwind classes use these colors:**
- `bg-blue-600` → primary color
- `text-blue-600` → primary text
- `border-gray-200` → secondary color

**To customize:**
1. Pick new color codes (e.g., from Tailwindcss.com/colors)
2. Update the config
3. Rebuild: `npm run dev`

### Update Typography

**In `tailwind.config.js`:**

```javascript
theme: {
  extend: {
    fontSize: {
      // Add custom sizes
      'xxl': '2rem',
    },
    fontFamily: {
      // Add custom fonts
      sans: ['Poppins', 'sans-serif'],
    },
  },
}
```

### Update Layout

**Change max-width container (pages are ~1280px wide):**

In `pages/index.js` and `pages/results.js`, change:
```html
<div className="max-w-4xl mx-auto">  <!-- Currently 4xl (896px) -->
<div className="max-w-6xl mx-auto">  <!-- Make wider (1152px) -->
<div className="max-w-2xl mx-auto">  <!-- Make narrower (672px) -->
```

### Change Form Fields

**In `pages/index.js`, modify the form fields:**

```javascript
// Add a new field:
<div>
  <label htmlFor="campaignGoal" className="...">
    Campaign Goal (Optional)
  </label>
  <select
    id="campaignGoal"
    name="campaignGoal"
    value={formData.campaignGoal}
    onChange={handleChange}
    className="..."
  >
    <option>Build awareness</option>
    <option>Drive sales</option>
    <option>Build community</option>
  </select>
</div>

// Update formData state:
const [formData, setFormData] = useState({
  communityName: '',
  niche: '',
  description: '',
  targetAudience: '',
  campaignGoal: '',  // Add this
})

// Use it in API call:
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
```

## Adding Features

### Add User Authentication

**Step 1: Install Supabase**
```bash
npm install @supabase/supabase-js
```

**Step 2: Create API wrapper**
```javascript
// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

**Step 3: Add login page**
```javascript
// pages/login.js
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
  }
  
  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Sign in with email</button>
    </div>
  )
}
```

### Add Database Storage

**Step 1: Create a table in Supabase**
```sql
CREATE TABLE strategies (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  community_name TEXT,
  niche TEXT,
  description TEXT,
  target_audience TEXT,
  recommendations JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

**Step 2: Save strategies**
```javascript
// In pages/results.js
async function saveStrategy() {
  const { error } = await supabase
    .from('strategies')
    .insert({
      user_id: user.id,
      community_name: communityInfo.communityName,
      recommendations: data
    })
  
  if (error) alert(error.message)
  else alert('Strategy saved!')
}
```

### Add Claude API for Better Content

**Step 1: Get Claude API key**
- Sign up at console.anthropic.com
- Create API key
- Add to `.env.local`: `ANTHROPIC_API_KEY=your-key`

**Step 2: Call Claude in API**
```javascript
// pages/api/generate.js
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

async function generateRecommendations({ communityName, niche, description, targetAudience }) {
  // Generate long description with Claude
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Write a 100-150 word About page for a Skool community:
      
Name: ${communityName}
Niche: ${niche}  
Target: ${targetAudience}

Keep it direct and practical, no generic fluff.`
    }]
  })
  
  const longDescription = response.content[0].text
  
  // Return recommendations with Claude-generated content
  return {
    keywords: generateKeywords(niche, targetAudience, description),
    short_description: generateShortDescription(niche, targetAudience, description),
    long_description: longDescription,  // From Claude
    content_plan: generateContentPlan(communityName, niche, targetAudience, description)
  }
}
```

### Add Skool API Integration

**Step 1: Get Skool API credentials**
- Contact Skool for API access
- Add credentials to environment

**Step 2: Sync data with Skool**
```javascript
// pages/api/sync-skool.js
export default async function handler(req, res) {
  const { communityId, recommendations } = req.body
  
  // Use Skool API to update community
  const response = await fetch('https://api.skool.com/communities/update', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SKOOL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: communityId,
      description: recommendations.long_description,
      tagline: recommendations.short_description
    })
  })
  
  res.json({ success: true })
}
```

### Add Analytics Tracking

**Step 1: Install analytics library**
```bash
npm install react-gtag
# or
npm install posthog
```

**Step 2: Track events**
```javascript
// pages/results.js
import gtag from 'react-gtag'

const handleCopyClick = (content, type) => {
  gtag.event('copy_content', {
    content_type: type,
    community_niche: communityInfo.niche
  })
  navigator.clipboard.writeText(content)
}
```

## Common Customizations

### Make Keywords More Specific

**Problem:** Keywords are too generic  
**Solution:** Add niche-specific keyword generation

```javascript
const nicheKeywords = {
  'copywriting': [
    'sales copywriting',
    'email copywriting for SaaS',
    'conversion copywriting tips'
  ],
  'indie hacking': [
    'indie hacker community',
    'bootstrap a startup',
    'solopreneur tips'
  ]
}

function generateKeywords(niche, targetAudience, description) {
  const specificKeywords = nicheKeywords[niche] || []
  const generic = [...specificKeywords, `${niche} community`, ...]
  return generic.slice(0, 9)
}
```

### Customize Post Content by Niche

**Problem:** Posts are generic  
**Solution:** Create niche-specific post templates

```javascript
const postTemplates = {
  'copywriting': {
    'value/tip': "The one thing that improved my conversion rate by 40%...",
    'behind-the-scenes': "Here's how I approach writing sales pages..."
  },
  'indie hacking': {
    'value/tip': "The fastest way to validate an idea (I tested this 10 times)...",
    'behind-the-scenes': "My actual process for launching a side project..."
  }
}
```

### Change the Default Form Values

**In `pages/index.js`:**
```javascript
const [formData, setFormData] = useState({
  communityName: '',
  niche: 'Copywriting',  // Default to a niche
  description: '',
  targetAudience: 'Freelance writers',  // Default audience
})
```

## Performance Optimizations

### Cache Results

**In `pages/results.js`, save to localStorage:**
```javascript
useEffect(() => {
  const cache = JSON.parse(localStorage.getItem('strategiesCache')) || {}
  cache[communityInfo.communityName] = data
  localStorage.setItem('strategiesCache', JSON.stringify(cache))
}, [data])
```

### Lazy Load Images

**If you add images:**
```javascript
<img 
  src={image} 
  loading="lazy"
  className="..."
/>
```

## Testing Changes

After customizing:

1. **Test locally:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Fill form and check results
   ```

2. **Check different inputs:**
   - Try different niches
   - Try different audiences
   - Test with long/short inputs

3. **Browser console:**
   - Open DevTools
   - Check for errors
   - Check network tab for API calls

4. **Build for production:**
   ```bash
   npm run build
   npm start
   # Check for build errors
   ```

## Getting Help

- **Next.js docs:** https://nextjs.org/docs
- **Tailwind docs:** https://tailwindcss.com/docs
- **React docs:** https://react.dev
- **Anthropic API:** https://docs.anthropic.com
- **Supabase docs:** https://supabase.com/docs

---

The goal is to make it easy to customize without deep diving into the code. Start small, test often, and iterate based on user feedback.
