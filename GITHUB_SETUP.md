# GitHub Setup Instructions

Your code is ready to push to GitHub! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `linea-poh-api` (or any name you prefer)
   - **Description**: "REST API proxy for Linea Proof of Humanity verification, compatible with Layer3 Custom API Integration"
   - **Visibility**: Choose **Public** (so others can access it) or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/ehsan/Library/Mobile Documents/com~apple~CloudDocs/Linea PoH API"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/linea-poh-api.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/linea-poh-api.git
git branch -M main
git push -u origin main
```

## What's Included

The repository includes:
- ✅ `server.js` - Main API server
- ✅ `package.json` - Dependencies
- ✅ `README.md` - Documentation
- ✅ `DEPLOYMENT.md` - Deployment guide
- ✅ `vercel.json` - Vercel configuration
- ✅ `test-api.sh` - Test script
- ✅ `.gitignore` - Git ignore rules

## After Pushing

Once pushed, others can:
- Clone the repository
- Deploy it to their own Vercel/Railway/Render account
- Use it for their Layer3 quests
- Contribute improvements

Your live API will remain at: `https://linea-poh-api.vercel.app/verify`

