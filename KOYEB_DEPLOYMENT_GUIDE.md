# 🚀 Koyeb Deployment Guide - BEST FREE OPTION

## ✅ Why Koyeb?

- **100% FREE** - No credit card required
- **No cold starts** - Always running
- **Perfect for full-stack** - Handles both frontend and backend
- **Simple deployment** - Just connect GitHub
- **Reliable** - Doesn't shut down like Cyclic
- **Global CDN** - Fast worldwide

---

## 📋 Step-by-Step Deployment

### Step 1: Create Koyeb Account

1. Go to **https://www.koyeb.com/**
2. Click **"Sign Up"** (top right)
3. Sign up with **GitHub** (easiest option)
4. Authorize Koyeb to access your GitHub

---

### Step 2: Prepare Your Code

Make sure your code is pushed to GitHub:

```powershell
cd C:\Users\sweta\OneDrive\Desktop\SpellVoc
git add .
git commit -m "Prepare for Koyeb deployment"
git push
```

---

### Step 3: Create New App on Koyeb

1. Go to **Koyeb Dashboard** → Click **"Create App"**
2. Select **"GitHub"** as source
3. Choose your **SpellVoc repository**
4. Select **"main"** branch

---

### Step 4: Configure Build Settings

**Important Settings:**

- **Name**: `spellvoc` (or any name you like)
- **Build Command**: `cd server && npm install`
- **Run Command**: `cd server && npm start`
- **Root Directory**: Leave empty (or set to `server` if needed)

**OR use these settings if Root Directory doesn't work:**

- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Run Command**: `npm start`

---

### Step 5: Set Environment Variables

Click **"Environment Variables"** tab and add:

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

**Click "Save" after adding each variable.**

---

### Step 6: Deploy!

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build
3. Your app will be live at: `https://your-app-name.koyeb.app`

---

## ✅ Verify Deployment

1. Visit your Koyeb URL
2. Check if homepage loads
3. Test API: `https://your-app-name.koyeb.app/api/health`
4. Try login/register

---

## 🆘 Troubleshooting

### "Build Failed"
- Check **Root Directory** is set correctly
- Make sure `server/package.json` exists
- Check build logs in Koyeb dashboard

### "Cannot GET /"
- Verify `server/src/index.js` is serving static files correctly
- Check that `server/public/index.html` exists

### "MongoDB Connection Failed"
- Verify `MONGODB_URI` environment variable is set correctly
- Check MongoDB Atlas IP whitelist (allow all: `0.0.0.0/0`)

### "Port Error"
- Koyeb automatically sets PORT, but make sure your code uses `process.env.PORT || 4000`

---

## 🎉 That's It!

Koyeb is **100% FREE** and **RELIABLE** - perfect for your full-stack app!

**Your site will be live at:** `https://your-app-name.koyeb.app`

---

## 📝 Notes

- **No credit card required** ✅
- **Always running** (no sleep) ✅
- **Free SSL certificate** ✅
- **Custom domain support** (free tier) ✅

