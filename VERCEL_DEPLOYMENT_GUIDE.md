# 🚀 Vercel Deployment Guide - FREE & RELIABLE

## ✅ Why Vercel is PERFECT for Your Project

✅ **100% FREE** - No credit card required!  
✅ **Never sleeps** - Always running, no cold starts  
✅ **Perfect for full-stack** - Supports Express + static files  
✅ **Super easy** - Deploy from GitHub in 2 minutes  
✅ **Works everywhere** - Mobile, desktop, all devices  
✅ **Free SSL** - HTTPS included automatically  
✅ **Global CDN** - Fast loading worldwide  
✅ **Auto-deploy** - Updates automatically on git push  

---

## 📋 Your Project Structure

Your app is perfect for Vercel:
```
SpellVoc/
├── server/
│   ├── src/
│   │   └── index.js (serves API + static files)
│   ├── public/ (frontend files)
│   └── package.json
```

Vercel will automatically:
- Detect your Node.js app
- Serve your Express API
- Serve your static files
- Handle routing correctly

---

## 🚀 Step-by-Step Deployment

### Step 1: Create Vercel Account

1. Go to **https://vercel.com/**
2. Click **"Sign Up"** (top right)
3. Sign up with **GitHub** (recommended - easiest way)

---

### Step 2: Prepare Your Project

Your project structure is already good! But we need to create a `vercel.json` file to tell Vercel how to serve your app.

**Create `vercel.json` in the root directory:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/src/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "server/src/index.js"
    }
  ]
}
```

**What this does:**
- Tells Vercel to use Node.js for your server
- Routes `/api/*` to your Express API
- Routes everything else to your Express app (which serves static files)

---

### Step 3: Update Root package.json

Make sure your root `package.json` has the correct start script:

```json
{
  "name": "spellvoc-backend",
  "version": "1.0.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "start": "cd server && node src/index.js",
    "dev": "cd server && nodemon src/index.js"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "razorpay": "^2.9.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

### Step 4: Push to GitHub

Make sure your code is on GitHub:

```bash
cd C:\Users\sweta\OneDrive\Desktop\SpellVoc
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

---

### Step 5: Deploy on Vercel

1. **Go to Vercel Dashboard** → Click **"Add New..."** → **"Project"**

2. **Import from GitHub:**
   - Select your `SpellVoc` repository
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Leave as "Other" or "Node.js"
   - **Root Directory:** Leave empty (or set to `.` if needed)
   - **Build Command:** Leave empty (Vercel will auto-detect)
   - **Output Directory:** Leave empty
   - **Install Command:** `cd server && npm install` (or just `npm install` if dependencies are in root)

4. **Environment Variables:**
   Click **"Environment Variables"** and add:
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
   RAZORPAY_KEY_ID=your-razorpay-key
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   ```

5. **Click "Deploy"**
   - Wait 2-3 minutes
   - Vercel will build and deploy your app

---

### Step 6: Get Your URL

After deployment:
- Your app will be at: `https://spellvoc.vercel.app` (or similar)
- You can also add a custom domain later (free!)

---

## ✅ Verify Deployment

1. **Visit your Vercel URL**
   - Should see your homepage

2. **Test API:**
   - `https://your-app.vercel.app/api/health`
   - Should return JSON

3. **Test from mobile:**
   - Open the URL on your phone
   - Should work perfectly!

---

## 🔧 Alternative: Simpler Configuration

If the above doesn't work, try this simpler approach:

**Update `vercel.json` in root:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server/src/index.js"
    }
  ]
}
```

**Note:** Your `server/src/index.js` already exports the app (I've added this), so it should work!

---

## 🔧 Alternative 2: Even Simpler (No vercel.json)

If both configurations above don't work, try this:

1. **Delete `vercel.json`** (or rename it to `vercel.json.backup`)

2. **In Vercel Dashboard:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Output Directory:** Leave empty
   - **Install Command:** Leave empty

3. **Vercel will auto-detect** your Express app and deploy it!

This is the simplest approach - let Vercel figure it out automatically!

---

## 🆘 Troubleshooting

### "Cannot find module"
- Make sure all dependencies are in `server/package.json`
- Vercel will auto-install from `server/package.json`

### "Cannot GET /"
- Check that `server/public/index.html` exists
- Verify static file path in `index.js`

### "Function timeout"
- Vercel free tier has 10-second timeout for serverless functions
- Your Express app should handle this fine

### "MongoDB connection failed"
- Check your `MONGODB_URI` in environment variables
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

---

## 🎉 That's It!

Vercel is **FREE**, **RELIABLE**, and **WORKS EVERYWHERE**!

**Your site:** `https://your-app.vercel.app`

---

## 📝 Why Vercel is Better Than Others

| Feature | Vercel | Render | Netlify | Replit |
|---------|--------|--------|---------|--------|
| Free tier | ✅ Yes | ⚠️ Sleeps | ✅ Yes | ✅ Yes |
| No credit card | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Always running | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| Full-stack support | ✅ Excellent | ⚠️ Limited | ⚠️ Limited | ✅ Yes |
| Easy deployment | ✅ Very easy | ⚠️ Medium | ⚠️ Medium | ✅ Easy |
| Global CDN | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| Auto-deploy | ✅ Yes | ✅ Yes | ✅ Yes | ⚠️ Manual |

**Vercel wins!** 🏆

---

## 🚀 Next Steps After Deployment

1. **Update CORS in `server/src/index.js`:**
   Add your Vercel URL to allowed origins:
   ```javascript
   const allowedOrigins = [
     'https://your-app.vercel.app',
     'https://www.your-app.vercel.app',
     // ... existing origins
   ];
   ```

2. **Test everything:**
   - Registration
   - Login
   - API calls
   - Static files

3. **Add custom domain (optional):**
   - Vercel allows free custom domains
   - Go to Project Settings → Domains

---

## 💡 Pro Tips

- **Auto-deploy:** Every git push auto-deploys (amazing!)
- **Preview deployments:** Every PR gets a preview URL
- **Analytics:** Free analytics included
- **Edge functions:** Can use edge functions for even faster API calls

---

**Vercel is the BEST free option for your full-stack app!** 🎉

