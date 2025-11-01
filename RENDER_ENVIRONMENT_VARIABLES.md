# 🔐 Render Environment Variables - Exact Values

## 📋 Step-by-Step: What to Add in Render

In Render dashboard, go to **Environment Variables** section and add these **ONE BY ONE**:

---

## ✅ Required Variables (Add All These)

### 1️⃣ **MONGODB_URI**
```
NAME: MONGODB_URI
VALUE: mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/spellvoc?retryWrites=true&w=majority
```
**⚠️ Replace with your actual MongoDB Atlas connection string!**
- Go to MongoDB Atlas → Connect → Drivers → Copy connection string
- Replace `<password>` with your actual password
- Replace `spellvoc` with your database name if different

**Example:**
```
mongodb+srv://spellvoc:MyPassword123@cluster0.abc123.mongodb.net/spellvoc?retryWrites=true&w=majority
```

---

### 2️⃣ **JWT_ACCESS_SECRET**
```
NAME: JWT_ACCESS_SECRET
VALUE: any-random-long-string-minimum-32-characters-long-for-security
```
**Generate a random string** (can be anything, just make it long and random)
**Example:**
```
spellvoc_access_secret_key_2025_super_secure_random_string_12345
```

---

### 3️⃣ **JWT_REFRESH_SECRET**
```
NAME: JWT_REFRESH_SECRET
VALUE: another-random-long-string-different-from-access-secret
```
**Generate another random string** (different from JWT_ACCESS_SECRET)
**Example:**
```
spellvoc_refresh_secret_key_2025_also_super_secure_different_67890
```

---

### 4️⃣ **ACCESS_TOKEN_TTL**
```
NAME: ACCESS_TOKEN_TTL
VALUE: 15m
```
(15 minutes - how long access tokens last)

---

### 5️⃣ **REFRESH_TOKEN_TTL**
```
NAME: REFRESH_TOKEN_TTL
VALUE: 7d
```
(7 days - how long refresh tokens last)

---

### 6️⃣ **EMAIL_USER**
```
NAME: EMAIL_USER
VALUE: your-email@gmail.com
```
**⚠️ Replace with your actual Gmail address** (the one you'll use to send emails)
**Example:**
```
spellvoc1997@gmail.com
```

---

### 7️⃣ **EMAIL_PASS**
```
NAME: EMAIL_PASS
VALUE: your-16-character-app-password
```
**⚠️ This is NOT your regular Gmail password!**
**You need a Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification (if not already)
3. Go to "App passwords"
4. Generate new app password for "Mail"
5. Copy the 16-character password (format: `abcd efgh ijkl mnop`)
6. Paste it here (remove spaces or keep spaces, both work)

**Example:**
```
hjjw htwg sntc yveq
```
or
```
hjjwhtwgsntcyveq
```

---

### 8️⃣ **FRONTEND_URL**
```
NAME: FRONTEND_URL
VALUE: https://your-app-name.onrender.com
```
**⚠️ After deploying, Render will give you a URL. Use that URL here!**
**Example:**
```
https://spellvoc.onrender.com
```

**Note:** Initially, you can use `http://localhost:4000` or your Render URL. After deployment, update it to your actual Render URL.

---

### 9️⃣ **PORT**
```
NAME: PORT
VALUE: 4000
```
(Render will also set this automatically, but it's good to set it explicitly)

---

### 🔟 **NODE_ENV**
```
NAME: NODE_ENV
VALUE: production
```
(This tells Node.js it's running in production mode)

---

## 📝 Quick Copy-Paste Template

If you want to copy-paste, here's the format:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/spellvoc?retryWrites=true&w=majority
JWT_ACCESS_SECRET=spellvoc_access_secret_key_2025_super_secure_random_string_12345
JWT_REFRESH_SECRET=spellvoc_refresh_secret_key_2025_also_super_secure_different_67890
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
EMAIL_USER=spellvoc1997@gmail.com
EMAIL_PASS=hjjw htwg sntc yveq
FRONTEND_URL=https://spellvoc.onrender.com
PORT=4000
NODE_ENV=production
```

**⚠️ REMEMBER:** Replace all the example values with YOUR actual values!

---

## 🎯 How to Add in Render

1. Go to your Render service dashboard
2. Click on **"Environment"** tab (or **"Environment Variables"** section)
3. Click **"Add Environment Variable"** button
4. For each variable:
   - Enter the **NAME** (exactly as shown above)
   - Enter the **VALUE** (your actual value)
   - Click **"Save"**
5. Repeat for all 10 variables

---

## ✅ Checklist

After adding, verify you have:
- [ ] MONGODB_URI (your Atlas connection string)
- [ ] JWT_ACCESS_SECRET (random string)
- [ ] JWT_REFRESH_SECRET (random string, different from access)
- [ ] ACCESS_TOKEN_TTL (`15m`)
- [ ] REFRESH_TOKEN_TTL (`7d`)
- [ ] EMAIL_USER (your Gmail)
- [ ] EMAIL_PASS (Gmail app password)
- [ ] FRONTEND_URL (your Render URL - update after deployment)
- [ ] PORT (`4000`)
- [ ] NODE_ENV (`production`)

---

## 🆘 Important Notes

### MongoDB Atlas
- Make sure your MongoDB Atlas cluster allows connections from anywhere
- Go to MongoDB Atlas → Network Access → Add IP Address: `0.0.0.0/0` (allow all)

### Gmail App Password
- You MUST use App Password, NOT your regular Gmail password
- If you haven't generated one, do it now: Google Account → Security → App passwords

### FRONTEND_URL
- Initially, you can set this to `http://localhost:4000`
- After Render deploys and gives you a URL, update this to your Render URL
- Example: If Render gives you `https://spellvoc.onrender.com`, set `FRONTEND_URL=https://spellvoc.onrender.com`

---

## ✨ After Adding Variables

1. Click **"Save Changes"** or **"Manual Deploy"**
2. Render will rebuild your app with the new environment variables
3. Wait for deployment to complete (~5 minutes)
4. Your app should be live! 🎉

