# 🚀 Replit Deployment Guide - Free & Easy

## ✅ Why Replit?

- **100% FREE** - No credit card required
- **Always running** - No sleep on free tier
- **Easy setup** - Import from GitHub
- **Built-in terminal** - Full control
- **Great for Node.js** - Perfect for Express

---

## 📋 Step-by-Step Deployment

### Step 1: Create Replit Account

1. Go to **https://replit.com/**
2. Click **"Sign Up"** (top right)
3. Sign up with **GitHub** (easiest)

---

### Step 2: Create New Repl

1. Click **"Create Repl"** (top left)
2. Select **"Import from GitHub"**
3. Enter your repo URL: `https://github.com/your-username/SpellVoc`
4. Click **"Import"**

---

### Step 3: Configure for Your Project

**Important:** Replit needs to know your project structure.

1. In Replit, you'll see your files
2. Click **"Secrets"** (lock icon in left sidebar)
3. Add environment variables:

```
MONGODB_URI=mongodb+srv://swetasipra0828_db_user:Sweta0808@cluster0.ktofkez.mongodb.net/SpellVoc?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your-random-secret-key-here
JWT_REFRESH_SECRET=another-random-secret-key-here
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
```

---

### Step 4: Update .replit File

Create or update `.replit` file in root:

```toml
run = "cd server && npm start"
entrypoint = "server/src/index.js"
```

---

### Step 5: Update package.json

Create or update root `package.json`:

```json
{
  "name": "spellvoc",
  "version": "1.0.0",
  "scripts": {
    "start": "cd server && node src/index.js"
  }
}
```

---

### Step 6: Deploy

1. Click **"Run"** button (top center)
2. Wait for build to complete
3. Your app will be at: `https://your-repl-name.your-username.repl.co`

---

## ✅ Verify Deployment

1. Visit your Replit URL
2. Check if homepage loads
3. Test API endpoint

---

## 🆘 Troubleshooting

### "Module not found"
- Run `cd server && npm install` in terminal
- Make sure all dependencies are in `server/package.json`

### "Port error"
- Replit sets PORT automatically
- Use `process.env.PORT || 4000` in your code

---

## 🎉 That's It!

Replit is **FREE** and **RELIABLE**!

**Your site:** `https://your-repl-name.your-username.repl.co`

---

## 📝 Notes

- **Free tier:** Always running ✅
- **No credit card** ✅
- **Built-in code editor** ✅
- **Terminal access** ✅

