# Deployment Guide

This guide covers deploying the Linea PoH API Proxy to various platforms.

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd "/Users/ehsan/Library/Mobile Documents/com~apple~CloudDocs/Linea PoH API"
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy

4. **Your API will be live at**: `https://your-project.vercel.app/verify`

5. **Use this URL in Layer3**: `https://your-project.vercel.app/verify`

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select this repo
4. Railway will auto-detect Node.js and deploy
5. Your API will be live automatically

### Option 3: Render

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy

### Option 4: Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run: `fly launch`
3. Follow prompts
4. Deploy: `fly deploy`

## Environment Variables

No environment variables are required for basic operation. The API uses:
- Default port: 3000 (or set `PORT` environment variable)

## Testing Your Deployed API

Once deployed, test your API:

```bash
# Replace with your actual deployed URL
curl "https://your-api.com/verify?address=0xc5fd29cC1a1b76ba52873fF943FEDFDD36cF46C6"
```

Expected responses:
- `{"status":"success"}` - Address has PoH
- `{"status":"failed"}` - Address does not have PoH

## Layer3 Integration

1. **In Layer3 Activation Builder**:
   - Navigate to your quest
   - Add a new step
   - Select "Custom API" action type
   - Enter your API endpoint: `https://your-deployed-api.com/verify`
   - Save

2. **How it works**:
   - When users click "Verify", Layer3 automatically calls: `https://your-deployed-api.com/verify?address={user_wallet_address}`
   - If response is `{"status":"success"}`, user can proceed
   - If response is `{"status":"failed"}`, user cannot proceed

## Monitoring

- Check `/health` endpoint: `https://your-api.com/health`
- Monitor logs in your hosting platform's dashboard
- The API logs errors to console for debugging

## Troubleshooting

**API returns 500 errors:**
- Check if Linea's PoH API is accessible: `curl https://poh-api.linea.build/poh/v2/0xc5fd29cC1a1b76ba52873fF943FEDFDD36cF46C6`
- Check your deployment logs

**API not responding:**
- Verify the server is running
- Check port configuration
- Ensure your hosting platform allows outbound HTTPS requests

**Layer3 not accepting the API:**
- Verify the endpoint returns proper JSON
- Check that the URL is publicly accessible (not localhost)
- Ensure HTTPS is enabled (Layer3 requires HTTPS)

