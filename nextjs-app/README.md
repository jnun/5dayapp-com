# 5dayapp - Next.js Application

AI-first development agency landing page with secure contact form integration.

## Features

- 🚀 Next.js 16 with TypeScript
- 📧 Secure Mailgun API integration (secrets stored server-side)
- 💅 Custom CSS styling
- 📱 Fully responsive design
- ⚡ Server-side API routes

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Mailgun credentials:
```env
MAILGUN_API_KEY=your_mailgun_api_key_here
MAILGUN_DOMAIN=mail.5dayapp.com
MAILGUN_FROM_EMAIL=noreply@5dayapp.com
MAILGUN_TO_EMAIL=jason@upgrademedia.com
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore`)

2. Import your repository in Vercel

3. Add environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.local`:
     - `MAILGUN_API_KEY`
     - `MAILGUN_DOMAIN`
     - `MAILGUN_FROM_EMAIL`
     - `MAILGUN_TO_EMAIL`

4. Deploy!

## Project Structure

```
nextjs-app/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Secure Mailgun API endpoint
│   ├── components/
│   │   └── ContactForm.tsx       # Contact form component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── .env.local                    # Environment variables (local only)
├── .env.example                  # Example environment variables
└── package.json
```

## Security

✅ API keys are stored in environment variables, never exposed to client
✅ Server-side API routes handle sensitive operations
✅ GitHub secret scanning protection
✅ Vercel environment variables encrypted at rest

## API Routes

### POST /api/contact

Sends contact form emails via Mailgun.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "message": "Hello..."
}
```

**Response:**
```json
{
  "message": "Email sent successfully"
}
```
