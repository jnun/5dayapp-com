# Vercel Deployment Guide

## Local Development

The app is now fully configured and running correctly locally.

### Running Locally

```bash
cd nextjs-app
npm install  # If dependencies need to be installed
npm run dev  # Starts development server on http://localhost:3000 (or 3001 if 3000 is in use)
```

### Building for Production

```bash
cd nextjs-app
npm run build  # Creates production build
npm start      # Runs production server
```

## Vercel Deployment

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI if you haven't already:
```bash
npm install -g vercel
```

2. Deploy from the root directory:
```bash
vercel
```

The `vercel.json` configuration file in the root will automatically:
- Set the correct build command
- Point to the nextjs-app directory
- Configure the output directory
- Set up the Next.js framework

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the `vercel.json` configuration
5. Click "Deploy"

### Important Configuration

The project uses a `vercel.json` file at the root to configure:
- **Root Directory**: Points to `nextjs-app` subdirectory
- **Build Command**: `cd nextjs-app && npm run build`
- **Install Command**: `cd nextjs-app && npm install`
- **Output Directory**: `nextjs-app/.next`

### Environment Variables

If you have environment variables in `nextjs-app/.env.local`, you'll need to add them to Vercel:

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add each variable from your `.env.local` file

## Project Structure

```
.
├── nextjs-app/              # Main Next.js application
│   ├── app/                 # App router pages and components
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies
│   └── next.config.ts       # Next.js configuration
├── vercel.json              # Vercel deployment configuration
└── VERCEL_DEPLOYMENT.md     # This file
```

## Issues Fixed

1. ✅ Removed duplicate `package-lock.json` from root directory
2. ✅ Configured turbopack root directory in `next.config.ts`
3. ✅ Created `vercel.json` for proper deployment configuration
4. ✅ Verified production build works correctly
5. ✅ Added root `.gitignore` file

## Verification

- Local dev server: ✅ Running on http://localhost:3001
- Production build: ✅ Compiles successfully
- TypeScript check: ✅ No errors
- Static pages generated: ✅ 6/6 pages

## Routes

- `/` - Main landing page
- `/pitch` - Pitch page
- `/api/contact` - Contact form API endpoint (server-rendered)

## Support

If you encounter any issues during deployment:
1. Check that all environment variables are set in Vercel
2. Verify the build logs in Vercel dashboard
3. Ensure Node.js version compatibility (project uses Node 20+)
