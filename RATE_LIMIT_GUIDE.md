# 📧 Email Rate Limit Guide

Your Skool.Online MVP uses Supabase's email rate limiting to prevent abuse. Here's what you need to know.

## 🔴 The Error Message

```
"Email rate limit exceeded"
```

This error appears when someone tries to request multiple magic links too quickly.

---

## ⏱️ Rate Limits

**Supabase Default Limits:**
- **1 magic link per email per 60 seconds** (1 minute)
- **3 magic links per email per hour**
- **10 magic links per email per day**

---

## ✅ What Users See

### Error Message (Friendly):
```
"Too many attempts. Please wait a few minutes 
before requesting another link."
```

### Info Box (On Auth Page):
```
⏱️ Rate Limit Info:
You can request a magic link once per minute. 
If you get a rate limit message, please wait a 
few minutes before trying again.
```

---

## 🔧 How to Configure Rate Limits

### In Supabase Dashboard:

1. Go to **Authentication > Providers > Email**
2. Scroll to **Email Rate Limiting**
3. Options:
   - **Default** - Standard rate limits (1/min, 3/hour, 10/day)
   - **Custom** - Set your own limits
   - **Disable** - No rate limiting (not recommended)

### Recommended Settings for MVP:
- Keep defaults (1 per minute)
- Monitor for abuse
- Adjust after launch if needed

---

## 💡 Why Rate Limiting?

✅ **Security**: Prevents email bombing attacks  
✅ **Cost**: Limits email sending costs  
✅ **Deliverability**: Protects email reputation  
✅ **User Experience**: Prevents accidental spam  

---

## 🧪 Testing Rate Limit

### To Trigger the Error:

1. Go to `/auth`
2. Enter test email: `test@example.com`
3. Click "Send Magic Link" ✓
4. Wait 10 seconds
5. Click "Send Magic Link" again ✗
6. See error: "Too many attempts..."

### After 1 Minute:

- Error clears automatically
- User can request new link
- No user action needed

---

## 📊 Monitoring Rate Limits

### Supabase Dashboard:

1. Go to **Authentication > Audit Log**
2. Look for failed OTP requests
3. Filter by email address to see patterns

### Common Patterns:

| Pattern | Likely Cause |
|---------|--------------|
| 10+ attempts in 1 hour | Spam/bot attack |
| 2-3 attempts in 1 minute | User impatience (normal) |
| 1 attempt per day | Normal usage |

---

## 🚀 Production Recommendations

1. **Monitor** abuse patterns in first month
2. **Keep defaults** unless you see abuse
3. **Use email verification** to reduce retries
4. **Track metrics** - failed vs successful logins
5. **Set alerts** if rate limits are constantly hit

---

## 🆘 What If Users Keep Getting Errors?

### Reasons:

1. **Too impatient** - Clicking too many times
2. **Email not received** - Check spam folder
3. **Link expired** - Wait 24 hours for new link
4. **Test email** - Using non-existent email domain

### Solutions:

1. Show rate limit message (✓ Done in auth page)
2. Add info box explaining limits (✓ Done in auth page)
3. Suggest checking spam folder
4. Provide retry guidance
5. Link to support/contact form

---

## 📈 Scaling Rate Limits

As your platform grows:

| Users | Recommendation |
|-------|---|
| < 1,000 | Default limits (safe) |
| 1,000 - 10,000 | Monitor, keep defaults |
| 10,000+ | Custom limits (more generous) |
| 100,000+ | Dedicated email service |

---

## 🔑 Key Points

✅ **Limit is PER EMAIL** - Different users can each request 1/min  
✅ **Automatic reset** - Resets after time window  
✅ **User-friendly error** - We show clear message  
✅ **Protected by default** - No configuration needed for MVP  
✅ **Easy to adjust** - Change in Supabase dashboard anytime  

---

## 🆘 Need Help?

### Check:
1. Supabase Dashboard → Authentication → Audit Log
2. Email provider logs
3. User's spam/junk folder

### Contact:
- Supabase Support: support@supabase.com
- Check: https://supabase.com/docs/guides/auth/managing-user-data

---

**Your rate limiting is configured and working!** Users will see helpful messages when they hit the limit. 🎉
