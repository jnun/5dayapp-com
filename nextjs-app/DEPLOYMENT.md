# Deployment Guide

## Quick Deploy to Vercel (5 minutes)

### Step 1: Prepare Repository

1. Make sure `.env.local` is in your `.gitignore` (it already is)
2. Push your code to GitHub:
   ```bash
   cd /Users/jnun/Projects/5dayapp-com/nextjs-app
   git init
   git add .
   git commit -m "Initial commit: Next.js app with secure Mailgun integration"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **IMPORTANT:** Add Environment Variables before deploying:
   - Click "Environment Variables"
   - Add these 4 variables (get values from your local `.env.local` file):
     ```
     MAILGUN_API_KEY=<your_api_key_from_.env.local>
     MAILGUN_DOMAIN=mail.5dayapp.com
     MAILGUN_FROM_EMAIL=noreply@5dayapp.com
     MAILGUN_TO_EMAIL=jason@upgrademedia.com
     ```
5. Click "Deploy"

### Step 3: Done! 🎉

Your site will be live at `https://your-project.vercel.app`

## Testing After Deployment

1. Visit your deployed URL
2. Scroll to the contact form
3. Fill it out and submit
4. Check jason@upgrademedia.com for the email

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add `5dayapp.com`
4. Follow DNS instructions to point your domain to Vercel

## Environment Variables Security

✅ API keys are NEVER exposed to the browser
✅ Only the server-side API route can access them
✅ Vercel encrypts environment variables at rest
✅ GitHub will block any accidental commits of secrets

## Troubleshooting

**Form not working after deploy?**
- Check Vercel logs for errors
- Verify all 4 environment variables are set
- Make sure Mailgun domain is verified

**Emails not sending?**
- Verify Mailgun API key is correct
- Check Mailgun dashboard for delivery logs
- Confirm `mail.5dayapp.com` domain is active
