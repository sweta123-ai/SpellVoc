# 🔧 Fix: Database Case-Sensitivity Error

## ❌ Current Error

```
Register failed: db already exists with different case already have: [SpellVoc] trying to create [spellvoc]
```

**Problem:** Your connection string uses `spellvoc` (lowercase) but MongoDB already has a database called `SpellVoc` (with capital V).

---

## ✅ Solution: Use Correct Database Name in Connection String

### Step 1: Update MONGODB_URI in Render

1. Go to **Render dashboard** → Your service
2. Click **"Environment"** tab
3. Find **`MONGODB_URI`** variable
4. Click **Edit**

### Step 2: Change Database Name

**Current (WRONG):**
```
mongodb+srv://swetasipra0828_db_user:Sweta0808@cluster0.ktofkez.mongodb.net/spellvoc?retryWrites=true&w=majority
```

**New (CORRECT - use this):**
```
mongodb+srv://swetasipra0828_db_user:Sweta0808@cluster0.ktofkez.mongodb.net/SpellVoc?retryWrites=true&w=majority
```

**⚠️ Notice:** Changed `/spellvoc` to `/SpellVoc` (capital V)

### Step 3: Save and Redeploy

1. Click **"Save"** or **"Save Changes"**
2. Render will automatically redeploy
3. Wait for deployment to complete

---

## ✅ After Fix

- ✅ No more case-sensitivity errors
- ✅ Registration will work
- ✅ Database connection will use the existing `SpellVoc` database

---

## 🔍 Why This Happened

MongoDB is **case-sensitive** for database names:
- `spellvoc` ≠ `SpellVoc` (treated as different databases)
- Your MongoDB Atlas already created `SpellVoc` (with capital V)
- But your connection string was trying to use `spellvoc` (lowercase)
- This caused a conflict

---

## ✅ Quick Fix Summary

**Just update the connection string in Render:**

Change:
```
...mongodb.net/spellvoc?retryWrites=true...
```

To:
```
...mongodb.net/SpellVoc?retryWrites=true...
```

That's it! Redeploy and it should work! 🎉

