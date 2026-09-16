# KHC Knowledge Explorer — Server

A small Node.js server that powers the public Knowledge House for Craft knowledge explorer. It holds your Anthropic API key server-side so visitors don't need one.

## Files

```
khc-explorer-server/
  server.js        — the backend (Express + Anthropic SDK)
  package.json     — dependencies
  public/
    index.html     — the public-facing page
  README.md        — this file
```

## Deploy to Railway (recommended — free tier) 

Railway is the easiest host for this. Free tier covers low-traffic use.

### Step 1 — Create a GitHub repository

1. Go to github.com and sign in (or create a free account)
2. Click **New repository**
3. Name it `khc-explorer` (or anything you like)
4. Set it to **Public** or **Private** — either works
5. Click **Create repository**
6. Upload all files from this folder to the repository (drag and drop works in the GitHub web interface)

### Step 2 — Deploy on Railway

1. Go to railway.app and sign in with your GitHub account
2. Click **New Project → Deploy from GitHub repo**
3. Select your `khc-explorer` repository
4. Railway will detect it's a Node.js project and deploy automatically

### Step 3 — Set your API key

1. In Railway, open your project and click **Variables**
2. Add a new variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (from console.anthropic.com)
3. Railway will restart the server automatically

### Step 4 — Get your public URL

Railway gives you a URL like `khc-explorer-production.up.railway.app`. That's your live explorer — share it or embed it.

### Step 5 — Point a custom domain (optional)

In Railway → Settings → Domains, you can add a custom domain like `explorer.knowledgehouseforcraft.org`. You'd then add a CNAME record in your DNS pointing to the Railway URL.

## Costs

- Railway free tier: 500 hours/month of runtime (enough for low traffic)
- Anthropic API: roughly $1–2 per 1,000 questions
- For a specialist academic audience, monthly API cost will likely be under $5

## Updating the knowledge base

The knowledge base is embedded in `server.js`. To add new claims or dictionary entries, edit the `KNOWLEDGE_BASE` constant, push the change to GitHub, and Railway redeploys automatically.

## Local testing

To run locally before deploying:

```bash
cd khc-explorer-server
npm install
ANTHROPIC_API_KEY=your-key-here npm start
```

Then open http://localhost:3000 in a browser.
