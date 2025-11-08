# 🚀 Fly.io Deployment - Step by Step Guide

## ✅ Good News: Fly CLI is Already Installed!

You already have Fly CLI installed! The `fly version` command worked perfectly.

---

## 📋 Step-by-Step Deployment

### Step 1: Login to Fly.io

**In PowerShell, type this command (without the ```bash part):**

```powershell
fly auth login
```

**What will happen:**
- Your browser will open automatically
- Click **"Authorize"** to allow Fly CLI access
- You'll see "Successfully logged in!" in PowerShell

---

### Step 2: Navigate to Your Project

**In PowerShell, type:**

```powershell
cd C:\Users\sweta\OneDrive\Desktop\SpellVoc\server
```

(We go to the `server` folder because that's where your Node.js app is)

---

### Step 3: Initialize Fly.io App

**In PowerShell, type:**

```powershell
fly launch
```

**Follow the prompts:**
- **App name**: Type `spellvoc` (or any unique name) and press Enter
- **Region**: Type `iad` (for US East) or `lhr` (for London) and press Enter
- **PostgreSQL?** → Type `n` and press Enter
- **Redis?** → Type `n` and press Enter  
- **Deploy now?** → Type `n` and press Enter (we'll configure first)

This creates a `fly.toml` file in your `server` folder.

---

### Step 4: Edit fly.toml

**Open the `fly.toml` file** (it's in your `server` folder) and make sure it looks like this:

```toml
app = "spellvoc"
primary_region = "iad"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "4000"
  NODE_ENV = "production"

[[services]]
  http_checks = []
  internal_port = 4000
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

**Important:**
- Replace `spellvoc` with your app name (if different)
- Replace `iad` with your chosen region

---

### Step 5: Set Environment Variables

**In PowerShell, type these commands one by one** (replace the values with your actual values):

```powershell
fly secrets set MONGODB_URI="mongodb+srv://swetasipra0828_db_user:Sweta0808@cluster0.ktofkez.mongodb.net/SpellVoc?retryWrites=true&w=majority"
```

```powershell
fly secrets set JWT_ACCESS_SECRET="your-random-secret-key-here-make-it-long"
```

```powershell
fly secrets set JWT_REFRESH_SECRET="another-random-secret-key-here-make-it-long"
```

```powershell
fly secrets set ACCESS_TOKEN_TTL="15m"
```

```powershell
fly secrets set REFRESH_TOKEN_TTL="7d"
```

```powershell
fly secrets set EMAIL_USER="your-email@gmail.com"
```

```powershell
fly secrets set EMAIL_PASS="your-gmail-app-password"
```

```powershell
fly secrets set NODE_ENV="production"
```

**After each command, you'll see:** `Secrets are staged for the next deployment`

---

### Step 6: Deploy!

**In PowerShell, type:**

```powershell
fly deploy
```

**What will happen:**
- Fly.io will build your app
- Upload it to their servers
- Deploy it
- Takes 3-5 minutes

**You'll see progress like:**
```
==> Building image
==> Creating release
==> Deploying
==> App deployed!
```

---

### Step 7: Get Your URL

**After deployment, type:**

```powershell
fly status
```

**Or just check the end of the deployment output** - it will show:
```
Your app is live at: https://spellvoc.fly.dev
```

**That's your live site!** 🎉

---

## ⚠️ Important Notes

### Don't Copy Markdown Code Blocks!

**❌ WRONG** (don't do this):
```
```bash
fly version
```
```

**✅ CORRECT** (just type the command):
```
fly version
```

The ````bash` and ````` are just formatting for documentation - don't copy them into PowerShell!

---

## 🆘 Troubleshooting

### "App name already taken"
- Try a different name: `spellvoc-app`, `spellvoc-site`, `my-spellvoc`, etc.

### "Not logged in"
- Run: `fly auth login` again

### "Cannot find fly.toml"
- Make sure you're in the `server` folder: `cd C:\Users\sweta\OneDrive\Desktop\SpellVoc\server`

### "Deployment failed"
- Check the error message
- Make sure all environment variables are set
- Check your MongoDB connection string

---

## ✅ Quick Checklist

- [ ] Fly CLI installed ✅ (you already have it!)
- [ ] Logged in: `fly auth login`
- [ ] In server folder: `cd server`
- [ ] Initialized app: `fly launch`
- [ ] Edited `fly.toml` with correct port (4000)
- [ ] Set all environment variables: `fly secrets set ...`
- [ ] Deployed: `fly deploy`
- [ ] Got URL: `https://your-app.fly.dev`

---

## 🎉 That's It!

Once deployed, your site will be live at `https://your-app.fly.dev` - **100% FREE, no loading pages!**

Good luck! 🚀

