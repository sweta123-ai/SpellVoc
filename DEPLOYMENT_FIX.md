# Deployment Fix - Backend URL Configuration

## Problem Fixed
The "failed to fetch" error when accessing the deployed site from different devices was caused by hardcoded `localhost:4000` API URLs in the frontend code.

## Solution Applied
✅ Updated API base URL to be dynamic:
- **Development**: Automatically uses `http://localhost:4000` when running locally
- **Production**: Uses configurable backend URL

## ⚠️ IMPORTANT: Configure Your Backend URL

Since your frontend is deployed on Netlify (`https://spellvoc.netlify.app/`) and your backend is on a separate server, you need to set the backend URL in the frontend files:

### Step 1: Find Your Backend URL
Your backend server is likely deployed on:
- Render.com
- Heroku
- Railway
- AWS/EC2
- Or another hosting service

Find the URL where your backend is accessible (e.g., `https://spellvoc-api.onrender.com` or `https://spellvoc-backend.herokuapp.com`)

### Step 2: Update Frontend Files

**File 1: `server/public/script.js`**
- Find line 832: `const BACKEND_URL = null;`
- Replace with: `const BACKEND_URL = 'https://your-backend-url.com';`

**File 2: `server/public/dashboard.html`**
- Find line 841: `const BACKEND_URL = null;`
- Replace with: `const BACKEND_URL = 'https://your-backend-url.com';`

### Example:
```javascript
// In both files, change this:
const BACKEND_URL = null;

// To this (replace with your actual backend URL):
const BACKEND_URL = 'https://spellvoc-api.onrender.com';
```

### Step 3: Deploy Updated Files
After updating the `BACKEND_URL` in both files:
1. Commit the changes
2. Push to your repository
3. Netlify will automatically redeploy your site

## CORS Configuration
The backend CORS has been updated to allow:
- ✅ `https://spellvoc.netlify.app`
- ✅ Localhost (for development)
- ✅ All origins (for flexibility)

If you need to restrict CORS further, edit `server/src/index.js` and modify the `allowedOrigins` array.

## Testing
1. **Local Testing**: 
   - Run `npm start` in the server folder
   - Open `http://localhost:4000`
   - Should work automatically

2. **Production Testing**:
   - After setting `BACKEND_URL`, deploy to Netlify
   - Open `https://spellvoc.netlify.app` from a different device
   - Registration should now work

## Troubleshooting

### Still getting "failed to fetch"?
1. ✅ Verify `BACKEND_URL` is set correctly in both files
2. ✅ Check your backend is running and accessible
3. ✅ Verify CORS allows your Netlify domain
4. ✅ Check browser console for exact error
5. ✅ Ensure backend URL uses `https://` (not `http://`) in production

### Backend not deployed?
You need to deploy your backend separately. Options:
- **Render.com** (free tier available)
- **Heroku** (requires credit card)
- **Railway** (free tier available)
- **AWS/EC2** (pay as you go)

After deploying, use that URL as your `BACKEND_URL`.

## Files Modified
- ✅ `server/public/script.js` - Dynamic API base URL
- ✅ `server/public/dashboard.html` - Dynamic API base URL  
- ✅ `server/src/index.js` - Enhanced CORS configuration

