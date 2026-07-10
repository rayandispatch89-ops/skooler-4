# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for Skool.Online.

## Step 1: Create a Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up or log in with your account
4. Click "New Project"
5. Fill in the project details:
   - **Project name**: Skool.Online
   - **Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait for the project to initialize (this may take a few minutes)

## Step 2: Get Your API Keys

1. Once your project is created, go to **Settings > API**
2. You'll see two important keys:
   - **Project URL**: This is your Supabase URL
   - **Anon Key**: This is your public API key (safe for frontend)

3. Copy both keys - you'll need them in the next step

## Step 3: Add Environment Variables

1. Open the `.env.local` file in your project root (create it if it doesn't exist)
2. Add your Supabase credentials:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `your-project` with your actual Supabase project name
- `your-anon-key-here` with your actual Anon Key

## Step 4: Enable Email Authentication

1. Go to your Supabase dashboard
2. Click **Authentication** in the left sidebar
3. Click **Providers** tab
4. Find "Email" and make sure it's enabled (it should be by default)
5. Configure email settings:
   - Go to **Settings > Email Templates**
   - Customize the confirmation and password reset emails if desired
   - Make sure the redirect URLs point to your application

## Step 5: Configure Email Provider (Optional but Recommended)

By default, Supabase uses a limited email service. For production, configure your own SMTP:

1. Go to **Settings > Email**
2. Scroll down to "SMTP Provider"
3. Choose your email provider:
   - SendGrid
   - Mailgun
   - AWS SES
   - Or any SMTP server

4. Enter your SMTP credentials
5. Set up the redirect URL: `http://localhost:3000/auth` (for development)

## Step 6: Test Authentication

1. Start your dev server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/auth`
3. Try signing up with an email address
4. You should receive a confirmation email
5. After confirming, you can sign in
6. You'll be redirected to the dashboard at `/dashboard`

## File Structure

Here's what was created:

```
D:\mvp\
├── lib/
│   └── supabaseClient.js          # Supabase client initialization
├── context/
│   └── AuthContext.js              # Auth state management
├── pages/
│   ├── _app.js                     # Updated with AuthProvider
│   ├── auth.js                     # Login/Signup page
│   ├── dashboard.js                # Protected dashboard page
│   └── auth/
│       └── forgot-password.js      # Password reset page
├── .env.example                    # Updated with Supabase keys
└── SUPABASE_SETUP.md              # This file
```

## Available Auth Features

### Sign Up
- Email and password registration
- Optional full name field
- Password confirmation validation
- Email confirmation required

### Sign In
- Email and password login
- "Forgot Password" link
- Session persistence

### Password Reset
- Forgot password flow
- Email link for password reset
- Update password functionality

### Dashboard
- Protected route (redirects to /auth if not logged in)
- User profile information
- Account creation date
- Email verification status
- Sign out functionality

## API Usage

### Using Auth in Components

```javascript
import { useAuth } from '@/context/AuthContext'

export default function MyComponent() {
  const { user, isAuthenticated, signOut, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  
  if (!isAuthenticated) return <div>Please log in</div>

  return (
    <div>
      Welcome, {user.email}!
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### AuthContext Methods

- `user` - Current authenticated user
- `isAuthenticated` - Boolean if user is logged in
- `loading` - Boolean if auth is loading
- `error` - Error message from auth actions
- `signUp(email, password, metadata)` - Create new account
- `signIn(email, password)` - Sign in user
- `signOut()` - Sign out current user
- `resetPassword(email)` - Send password reset email
- `updatePassword(password)` - Update user password

## Security Notes

⚠️ **Important Security Guidelines:**

1. **Never commit `.env.local`** - It's in `.gitignore` for a reason
2. **Anon Key is public** - The `NEXT_PUBLIC_` prefix means it's exposed in browser
3. **Use Row Level Security (RLS)** - Set up RLS on your Supabase tables
4. **Enable email confirmation** - Verify users own their email addresses
5. **Use strong passwords** - Enforce password requirements (6+ chars minimum)
6. **HTTPS only in production** - Never send auth tokens over HTTP

## Troubleshooting

### "Missing Supabase credentials"
- Check that `.env.local` exists and has the correct keys
- Make sure you copied the entire Anon Key
- Restart the dev server after adding env variables

### Email confirmation not working
- Check your email spam folder
- Verify SMTP settings in Supabase dashboard
- Check the email template in Authentication > Email Templates

### "CORS error" when signing up/in
- Go to **Settings > API** in Supabase
- Add your domain to "JWT Expiration" and verify CORS settings
- Make sure your site URL is added to allowed origins

### User not staying logged in after refresh
- Check browser console for errors
- Make sure `_app.js` has AuthProvider wrapping all components
- Check that localStorage is not disabled in browser

## Next Steps

1. ✅ Set up Supabase (you're here!)
2. Create user profiles table for additional data
3. Set up Row Level Security policies
4. Connect auth to your business logic
5. Deploy to production with environment variables

## Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Authentication in Supabase](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## Need Help?

- Check Supabase documentation: https://supabase.com/docs
- Visit Supabase community: https://github.com/supabase/supabase/discussions
- GitHub Issues: https://github.com/supabase/supabase/issues
