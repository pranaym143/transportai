# Deploying TRANSPORT AI to Vercel

This full-stack application (Vite React frontend + Express Gemini RAG backend) is pre-configured for one-click deployment on **Vercel**.

---

## Method 1: Deploy via GitHub & Vercel Dashboard (Recommended)

### Step 1: Push Code to GitHub
1. Create a new repository on your GitHub account (e.g. `transport-ai`).
2. Push your project code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Transport AI"
   git branch -M main
   git remote add origin https://github.com/<your-username>/transport-ai.git
   git push -u origin main
   ```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository (`transport-ai`) and click **"Import"**.

### Step 3: Configure Project Settings
Vercel will automatically detect the settings through `vercel.json`:
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (or leave default)
- **Output Directory**: `dist` (default)

### Step 4: Add Environment Variables
Under the **Environment Variables** section:
- **Key**: `GEMINI_API_KEY`
- **Value**: Your Google Gemini API Key (get one from [Google AI Studio](https://aistudio.google.com/app/apikey))

*(Optional: Set `NODE_ENV` to `production`)*

### Step 5: Click "Deploy"
Vercel will:
1. Build the React SPA into static assets hosted on Vercel's global CDN.
2. Deploy the Express API routes in `api/index.ts` as a serverless function.
3. Provide your live production URL (e.g., `https://transport-ai.vercel.app`).

---

## Method 2: Deploy via Vercel CLI

If you have the Vercel CLI installed locally:

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to preview
vercel

# 4. Set your Gemini API key in Vercel
vercel env add GEMINI_API_KEY

# 5. Deploy to production
vercel --prod
```

---

## How It Works on Vercel

- **Frontend**: Vite compiles all React components, Tailwind styling, and assets into `/dist`. Vercel serves them as high-speed edge static assets.
- **Backend API**: The `/api/index.ts` entry point exports the Express server instance. Vercel routes all `/api/*` calls (`/api/chat`, `/api/notes`, `/api/quiz`, etc.) to this serverless function.
- **RAG & Knowledge Base**: The 14-page PDF curriculum is bundled directly in memory, ensuring instant retrieval without external disk dependencies.
- **Offline / Transient Grace**: If no API key is provided or Gemini is temporarily unavailable, the app gracefully falls back to structured PDF excerpts with zero errors.
