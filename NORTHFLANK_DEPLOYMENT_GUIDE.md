# 🚀 Northflank Deployment Guide - SIMPLE & FREE Alternative

## ✅ Why Northflank?

✅ **100% FREE** - No credit card required!  
✅ **Always running** - No sleep, no cold starts  
✅ **Perfect for full-stack** - Designed for Node.js apps  
✅ **Super simple** - Just connect GitHub and deploy  
✅ **Works everywhere** - Mobile, desktop, all devices  
✅ **Free SSL** - HTTPS included automatically  
✅ **Easy database** - Can connect MongoDB easily  

---

## 📋 Step-by-Step Deployment

### Step 1: Create Northflank Account

1. Go to **https://northflank.com/**
2. Click **"Sign Up"** (top right)
3. Sign up with **GitHub** (recommended)

---

### Step 2: Create New Project

1. Click **"Create Project"** (or "New Project")
2. Give it a name: `spellvoc`
3. Click **"Create"**

---

### Step 3: Add Service

1. In your project, click **"Add Service"**
2. Select **"GitHub"** → **"Import from GitHub"**
3. Select your `SpellVoc` repository
4. Click **"Import"**

---

### Step 4: Configure Service

1. **Service Name:** `spellvoc-backend` (or any name)

2. **Build Settings:**
   - **Buildpack:** Node.js (auto-detected)
   - **Root Directory:** `server` (IMPORTANT!)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

3. **Environment Variables:**
   Click **"Environment"** tab and add:
   ```
   MONGODB_URI=mongodb+srv://swetasipra0828_db_user:Sweta0808@cluster0.ktofkez.mongodb.net/SpellVoc?retryWrites=true&w=majority
   JWT_ACCESS_SECRET=your-random-secret-key-here
   JWT_REFRESH_SECRET=another-random-secret-key-here
   ACCESS_TOKEN_TTL=15m
   REFRESH_TOKEN_TTL=7d
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   NODE_ENV=production
   PORT=4000
   RAZORPAY_KEY_ID=your-razorpay-key
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   ```

4. **Port:**
   - Northflank sets PORT automatically
   - Your code already uses `process.env.PORT || 4000` ✅

---

### Step 5: Deploy!

1. Click **"Create Service"** or **"Deploy"**
2. Wait 2-3 minutes for build
3. Your app will be at: `https://spellvoc-backend.northflank.app` (or similar)

---

## ✅ Verify Deployment

1. Visit your Northflank URL
2. Check if homepage loads
3. Test API: `https://your-app.northflank.app/api/health`

---

## 🆘 Troubleshooting

### "Cannot find module"
- Make sure Root Directory is set to `server`
- Check that `server/package.json` has all dependencies

### "Cannot GET /"
- Check that `server/public/index.html` exists
- Verify static file path in `index.js`

---

## 🎉 That's It!

Northflank is **FREE**, **SIMPLE**, and **RELIABLE**!

**Your site:** `https://your-app.northflank.app`

---

## 📝 Why Northflank?

- **Free tier:** Always running ✅
- **No credit card** ✅
- **Easy setup** ✅
- **Perfect for full-stack Node.js** ✅

---

**Northflank is a great alternative if Vercel doesn't work!** 🎉

