# Deployment Guide

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Production Deployment Options

### Option 1: Vercel (Recommended - Free tier available)

Vercel is the company behind Next.js and makes deployment seamless.

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. Follow the prompts and your app will be live.

**Benefits:**
- Automatic deployments on git push
- Free tier includes generous limits
- Built-in analytics and performance monitoring
- Zero configuration needed

### Option 2: Netlify

1. **Connect your Git repo** to Netlify
2. **Set build command:** `npm run build`
3. **Set publish directory:** `.next`
4. **Deploy** - automatic on every push

### Option 3: Self-hosted (AWS, DigitalOcean, Heroku)

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Environment:** Node.js 18+ required

4. **Port:** Listens on port 3000 (configure via PORT env var)

## Adding a Database Later

When you're ready to add user accounts and persistence:

### Option 1: Supabase (PostgreSQL + Auth)
- Free tier perfect for MVP scaling
- Built-in authentication
- Real-time updates

### Option 2: Firebase
- No backend needed
- Easy authentication
- Serverless

### Option 3: MongoDB Atlas + Node backend
- More flexibility
- Good for complex features

## Environment Variables

Create a `.env.local` file for development:

```
# Add any future API keys here
# NEXT_PUBLIC_API_URL=
# API_KEY=
```

## Performance Optimization

- Image optimization: Add `next/image` for images
- Code splitting: Built-in with Next.js
- Caching: Add caching headers for static content
- Analytics: Integrate Vercel Analytics or similar

## Monitoring

Recommendations for keeping track of:
- **Errors:** Sentry or LogRocket
- **Performance:** Vercel Analytics or New Relic
- **Usage:** Custom event tracking
- **Uptime:** Better Uptime or Pingdom

## Scaling the Recommendation Engine

Current implementation:
- Template-based generation (fast, lightweight)
- Client-side storage

To make this more powerful:

1. **Add Claude API integration** for dynamic content generation:
   ```javascript
   // pages/api/generate.js
   const Anthropic = require("@anthropic-ai/sdk");
   
   const client = new Anthropic();
   const response = await client.messages.create({
     model: "claude-opus-4-1",
     max_tokens: 2000,
     messages: [{
       role: "user",
       content: `Generate keywords for a ${niche} community for ${targetAudience}...`
     }]
   });
   ```

2. **Add database for saved strategies:**
   ```javascript
   // Store user strategies
   await db.strategies.create({
     userId,
     communityName,
     recommendations: data
   });
   ```

3. **Add user accounts** for login and saved work

4. **Add feedback loop** to improve templates based on performance data

## Security Considerations

- Validate all user inputs on the backend
- Rate limit API endpoints (use middleware)
- Add CORS headers if needed
- Sanitize any user-generated content
- Use HTTPS in production (automatic on Vercel)

## Cost Estimates

**Vercel:**
- Free tier: Enough for ~1000 monthly users
- Paid: $20/month for more bandwidth

**Database (optional):**
- Supabase free tier: Good for initial growth
- MongoDB Atlas: Free tier included

**Total startup cost:** $0 (can stay free for years with Vercel's generous free tier)

## Monitoring Deployment

After deploying, monitor:
1. **Build time** - should be < 1 minute
2. **Function response time** - API should respond in < 500ms
3. **Error rates** - should be < 0.1%
4. **Uptime** - track availability

## Troubleshooting

**Build fails:**
- Check Node.js version (18+ required)
- Run `npm install` locally first
- Check for missing environment variables

**Pages don't load:**
- Clear browser cache
- Check browser console for errors
- Verify API endpoint is accessible

**Slow performance:**
- Check API response times
- Look for large assets
- Consider caching strategies
