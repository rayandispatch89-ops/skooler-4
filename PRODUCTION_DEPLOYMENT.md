# 🚀 Production Deployment Guide

## Supabase Magic Link Configuration for Production

### The Problem
When you deploy to production, the magic link redirect fails because Supabase only allows specific domains by default. It's currently configured for `localhost:3000`.

### Solution: Add Your Production Domain to Supabase

#### Step 1: Go to Supabase Dashboard
1. Visit [https://app.supabase.com](https://app.supabase.com)
2. Log in with your account
3. Select your project: **ihsnmuzveyczzkrpachf**

#### Step 2: Update Redirect URLs
1. Click **Authentication** in the left sidebar
2. Click **URL Configuration**
3. In the **Redirect URLs** section, you'll see:
   - `http://localhost:3000/auth/callback` (current)

#### Step 3: Add Your Production Domain
Add these URLs to the **Redirect URLs** list:

**For Vercel (Recommended):**
```
https://your-domain.vercel.app/auth/callback
```

**For Custom Domain:**
```
https://yourdomain.com/auth/callback
```

**Keep localhost for development:**
```
http://localhost:3000/auth/callback
```

#### Step 4: Save Changes
Click the **Save** button at the bottom of the page.

---

## Environment Variables for Production

### Set These Variables in Your Hosting Platform:

**For Vercel:**
1. Go to your project settings
2. Click **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ihsnmuzveyczzkrpachf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**For Other Platforms (Netlify, Railway, etc.):**
Follow similar steps to add environment variables.

---

## Complete Magic Link Flow

### How It Works:
1. **User enters email** → Sent to `/auth` page
2. **Email verification link sent** → Points to `your-domain.com/auth/callback`
3. **User clicks link** → Redirected to `/auth/callback` page
4. **Token verified** → Authenticated user
5. **Auto-redirect** → Sent to `/dashboard`

### Key Points:
✅ The domain in the magic link MUST match the Supabase allowed redirect URLs
✅ `http://` for localhost, `https://` for production
✅ Port numbers must match exactly
✅ The path must be exactly `/auth/callback`

---

## Testing Magic Link in Production

### Test Email Flow:
1. Deploy your app to production
2. Visit `https://yourdomain.com`
3. Click "Get Started"
4. Enter your email address
5. Check your email for the magic link
6. Click the link
7. You should be redirected to `/dashboard`

### Troubleshooting:

| Problem | Solution |
|---------|----------|
| "Invalid redirect URL" error | Make sure your domain is added to Supabase Redirect URLs |
| Email not received | Check spam folder, verify email in Supabase |
| Link opens but shows loading | Increase timeout, check browser console for errors |
| Stuck on `/auth/callback` | Make sure Supabase URL and key are correct in environment variables |

---

## Supabase Project Details

**Project ID:** `ihsnmuzveyczzkrpachf`  
**Supabase URL:** `https://ihsnmuzveyczzkrpachf.supabase.co`

---

## Quick Checklist for Production

Before going live, ensure:

- [ ] Production domain added to Supabase Redirect URLs
- [ ] Environment variables set in hosting platform
- [ ] NEXT_PUBLIC_SUPABASE_URL is correct
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- [ ] Tested magic link flow end-to-end
- [ ] Email verified in Supabase (check auth settings)
- [ ] Admin emails configured correctly in code
- [ ] All pricing links point to correct Whop URLs

---

## Support & Resources

- **Supabase Docs:** https://supabase.com/docs/guides/auth/magic-link
- **Project Dashboard:** https://app.supabase.com
- **Magic Link Setup Guide:** [MAGIC_LINK_AUTH.md](./MAGIC_LINK_AUTH.md)

---

## Example Production Domains

If you're deploying to:

- **Vercel:** `https://skool-online.vercel.app/auth/callback`
- **Netlify:** `https://skool-online.netlify.app/auth/callback`
- **Custom Domain:** `https://skool.online/auth/callback`

Add ALL of these to Supabase Redirect URLs if you have multiple domains!

---

**The magic link authentication will work seamlessly once your domain is added to Supabase! 🎉**
