# 🚀 Glitch Deployment Guide - Simple & Free

## ✅ Why Glitch?

- **100% FREE** - No credit card needed
- **Super simple** - Just import from GitHub
- **Always running** - No cold starts
- **Great for Node.js** - Perfect for your Express app
- **Live editing** - Edit code directly in browser

---

## 📋 Step-by-Step Deployment

### Step 1: Create Glitch Account

1. Go to **https://glitch.com/**
2. Click **"Sign In"** (top right)
3. Sign in with **GitHub** (recommended)

---

### Step 2: Create New Project

1. Click **"New Project"** → **"Import from GitHub"**
2. Enter your GitHub repository URL: `https://github.com/your-username/SpellVoc`
3. Click **"Import"**
4. Wait for import to complete

---

### Step 3: Configure Project

**Important:** Glitch needs to know where your server code is.

1. In Glitch editor, you'll see all your files
2. Click **`.env`** file (create if doesn't exist)
3. Add your environment variables:

```
MONGODB_URI=mongodb+srv://swetasipra0828_db_user:Sweta0808@cluster0.ktofkez.mongodb.net/SpellVoc?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your-random-secret-key-here-make-it-long-and-secure
JWT_REFRESH_SECRET=another-random-secret-key-here-make-it-long-and-secure
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
PORT=4000
```

---

### Step 4: Create Root package.json for Glitch

**Important:** Glitch needs a `package.json` in the root directory.

1. In Glitch editor, click **"New File"** (top left)
2. Name it: `package.json`
3. Copy and paste this content:

```json
{
  "name": "spellvoc",
  "version": "1.0.0",
  "scripts": {
    "start": "cd server && npm install && node src/index.js"
  }
}
```

4. Click **"Save"** (Ctrl+S or Cmd+S)

**What this does:**
- Glitch will automatically install dependencies from `server/package.json`
- Then runs your app from `server/src/index.js`

**Alternative (if above doesn't work):**
1. Click **"Tools"** → **"Terminal"** (bottom left)
2. Run: `cd server && npm install`
3. Then update root `package.json` start script to just: `"start": "cd server && node src/index.js"`

---

### Step 5: Update index.js Path

Since Glitch serves from root, you may need to update the static file path in `server/src/index.js`:

The path should be:
```javascript
const publicPath = path.join(__dirname, '../public');
```

This should already work if your structure is correct.

---

### Step 6: Deploy!

1. Glitch **auto-deploys** when you save files
2. Click **"Show"** button (top left) to see your live app
3. Your app will be at: `https://your-project-name.glitch.me`

---

## ✅ Verify Deployment

1. Visit your Glitch URL
2. Check if homepage loads
3. Test API: `https://your-project-name.glitch.me/api/health`

---

## 🆘 Troubleshooting

### "Cannot find module"
- Make sure you're in the right directory
- Run `npm install` in terminal

### "Cannot GET /"
- Check that `server/public/index.html` exists
- Verify static file path in `index.js`

### "Port already in use"
- Glitch sets PORT automatically, use `process.env.PORT`

---

## 🎉 That's It!

Glitch is **FREE** and **SIMPLE** - great for quick deployments!

**Your site:** `https://your-project-name.glitch.me`

---

## 📝 Notes

- **Free tier:** Always running ✅
- **No credit card** ✅
- **Can edit code in browser** ✅
- **Auto-deploys on save** ✅

