# Email Configuration Guide

The Contact Us page now sends emails to your inbox in real-time. Follow this guide to set it up.

## Quick Setup (Gmail)

### Step 1: Enable 2-Factor Authentication (if not already enabled)

1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification" and follow the steps
3. Return to security settings once enabled

### Step 2: Generate App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" from the dropdown
3. Select "Windows Computer" (or your device)
4. Google will generate a 16-character password
5. **Copy the entire password (without spaces)**

### Step 3: Create .env.local File

1. In the project root (`D:\mvp\`), create a new file named `.env.local`
2. Copy this content and paste it:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=paste-your-16-char-password-here
```

3. Replace:
   - `your-email@gmail.com` with your Gmail address
   - `paste-your-16-char-password-here` with the password from Step 2

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Restart Dev Server

```bash
npm run dev
```

## Testing the Contact Form

1. Visit `http://localhost:3000/contact`
2. Fill in the form:
   - Name: Your name
   - Email: Your email
   - Message: Your message
3. Click "Send Message"
4. Check your inbox for the message

You should receive:
- **Admin email**: Full submission details sent to `abdullah987570@gmail.com`
- **Confirmation email**: Sent to the user's email address confirming receipt

## Troubleshooting

### "Failed to send message" error

**Check 1: Missing .env.local**
- Make sure you created the `.env.local` file in the project root
- The file should NOT be committed (it's in .gitignore for security)

**Check 2: Wrong App Password**
- Make sure you used the 16-character **App Password**, not your Gmail password
- Remove all spaces from the password
- Go back to https://myaccount.google.com/apppasswords and regenerate if needed

**Check 3: Gmail not configured**
- Make sure 2-Factor Authentication is enabled
- Try regenerating the app password

**Check 4: Server needs restart**
- After adding .env.local, restart the dev server:
  ```bash
  npm run dev
  ```

## Advanced Configuration

### Using Other Email Services

If you want to use a different email provider (Outlook, custom SMTP, etc.), edit the API file:

**For Outlook/Hotmail:**
```
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

Update `/pages/api/contact.js` line ~7:
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',  // Change this
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})
```

### Custom SMTP Server

Edit `/pages/api/contact.js`:
```javascript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})
```

Then add to `.env.local`:
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
```

## Email Templates

### Admin Email
Shows the user's name, email, and message in a formatted card.

### Confirmation Email
Sends a thank you message to the user confirming their submission.

Both emails are sent in real-time when the form is submitted.

## Security Notes

⚠️ **Important:**
- `.env.local` is in `.gitignore` - NEVER commit it
- Never share your App Password
- If you accidentally commit it, regenerate the App Password immediately
- In production, use environment variables from your hosting provider (Vercel, etc.)

## Production Deployment

When deploying to production:

1. **On Vercel:**
   - Go to Project Settings → Environment Variables
   - Add `EMAIL_USER` and `EMAIL_PASSWORD`
   - Redeploy

2. **On other platforms:**
   - Set environment variables in your hosting dashboard
   - Follow their documentation for env vars

## Questions?

If the contact form doesn't work:
1. Check `.env.local` exists and has correct values
2. Restart `npm run dev`
3. Check browser console for error messages
4. Check server logs for email errors
