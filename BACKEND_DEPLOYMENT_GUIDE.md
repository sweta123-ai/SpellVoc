# 🚀 Backend Deployment Guide - Fix "Failed to Fetch" Issue

## Problem
Your frontend is on Netlify (`https://spellvoc.netlify.app`), but your backend is only running on your local computer. When someone opens the site on another device, they can't register because the frontend tries to call `localhost:4000`, which doesn't exist on their device.

## ✅ Solution: Deploy Your Backend to Render.com (FREE)

Render.com offers free hosting for Node.js apps. Here's how to deploy:

### Step 1: Create a Render Account
1. Go to https://render.com
2. Sign up with your GitHub account (or email)

### Step 2: Prepare Your Backend
1. Make sure your `server` folder has a `package.json` (✅ you already have this)
2. Make sure your backend starts with `npm start` (✅ already configured)

### Step 3: Push to GitHub
1. Make sure your code is on GitHub
2. If not, create a repo and push your code:
   ```bash
   cd C:\Users\sweta\OneDrive\Desktop\SpellVoc
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/spellvoc.git
   git push -u origin main
   ```

### Step 4: Deploy on Render
1. **Go to Render Dashboard** → Click "New +" → Select "Web Service"
2. **Connect GitHub** → Select your SpellVoc repository
3. **Configure Service**:
   - **Name**: `spellvoc-backend` (or any name)
   - **Region**: Choose closest to you (e.g., Singapore, Mumbai)
   - **Branch**: `main` (or `master`)
   - **Root Directory**: `server` (IMPORTANT!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables** - Click "Advanced" → Add these:
   ```
   MONGODB_URI=mongodb+srv://your-atlas-connection-string
   JWT_ACCESS_SECRET=your-access-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   ACCESS_TOKEN_TTL=15m
   REFRESH_TOKEN_TTL=7d
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   FRONTEND_URL=https://spellvoc.netlify.app
   PORT=4000
   NODE_ENV=production
   ```

   ⚠️ **Important**: Replace these with your actual values:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_ACCESS_SECRET` & `JWT_REFRESH_SECRET`: Random strings (use any long random text)
   - `EMAIL_USER` & `EMAIL_PASS`: Your Gmail credentials for sending emails
   - `FRONTEND_URL`: `https://spellvoc.netlify.app`

5. **Click "Create Web Service"**

### Step 5: Wait for Deployment
- Render will build and deploy your backend
- It will show a URL like: `https://spellvoc-backend.onrender.com`
- ⚠️ **Copy this URL!** You'll need it in the next step

### Step 6: Update Frontend with Backend URL

After deployment, you'll get a URL like: `https://spellvoc-backend.onrender.com`

**Update these 2 files:**

**File 1: `server/public/script.js`** (around line 832)
```javascript
const BACKEND_URL = 'https://spellvoc-backend.onrender.com'; // Your Render URL
```

**File 2: `server/public/dashboard.html`** (around line 841)
```javascript
const BACKEND_URL = 'https://spellvoc-backend.onrender.com'; // Your Render URL
```

### Step 7: Redeploy Frontend on Netlify
1. Commit and push the changes
2. Netlify will automatically redeploy
3. Test registration from another device - it should work! ✅

---

## 🆓 Free Tier Limitations (Render)
- **Sleeps after 15 min inactivity** - First request after sleep takes ~30 seconds
- **Free forever** - No credit card needed
- **750 hours/month free** - More than enough for small apps

**To prevent sleep**, you can use a service like UptimeRobot to ping your backend every 5 minutes.

---

## 🔄 Alternative: Railway.app (Also Free)
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Set root directory to `server`
5. Add environment variables (same as above)
6. Deploy!

---

## ✅ Quick Checklist
- [ ] Backend deployed on Render/Railway
- [ ] Got backend URL (e.g., `https://spellvoc-backend.onrender.com`)
- [ ] Updated `BACKEND_URL` in `script.js`
- [ ] Updated `BACKEND_URL` in `dashboard.html`
- [ ] Redeployed frontend on Netlify
- [ ] Tested registration from another device

---

## 🆘 Troubleshooting

### Backend URL not working?
- Wait 2-3 minutes after deployment
- Check Render logs for errors
- Verify environment variables are set correctly
- Make sure MongoDB Atlas allows connections from anywhere (IP: 0.0.0.0/0)

### Still getting "failed to fetch"?
- Open browser console (F12) to see exact error
- Check if backend URL is correct in both files
- Verify backend is running on Render (check status in dashboard)
- Make sure CORS is configured (already done in your code)

---

## 📝 Notes
- **MongoDB Atlas** - Your database is already in the cloud, so you just need to deploy the backend server
- **Frontend** - Stays on Netlify (free, fast CDN)
- **Backend** - Deployed on Render (free hosting)

This setup will work perfectly! 🎉

