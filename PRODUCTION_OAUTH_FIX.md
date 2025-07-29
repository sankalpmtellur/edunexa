# Fix OAuth Redirect for Production Deployment

## 🚨 Current Issue
Google OAuth is redirecting to `localhost:3000` instead of your Vercel deployment URL.

## ✅ Solution Steps

### Step 1: Update Supabase Site URL
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `xvrnnvasjqsonyixlelf`
3. Go to **Authentication** → **URL Configuration**
4. Change **Site URL** to: `https://edunexa-qjvg-git-main-sankalp-m-tellurs-projects.vercel.app`

### Step 2: Update Google OAuth Redirect URIs in Supabase
1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Click on **Google**
3. Add this redirect URL: `https://edunexa-qjvg-git-main-sankalp-m-tellurs-projects.vercel.app/auth/callback`

### Step 3: Update Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Add this **Authorized redirect URI**: `https://edunexa-qjvg-git-main-sankalp-m-tellurs-projects.vercel.app/auth/callback`

### Step 4: Verify Vercel Environment Variables
In your Vercel project settings, ensure these environment variables are set:
```
VITE_SUPABASE_URL=https://xvrnnvasjqsonyixlelf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cm5udmFzanFzb255aXhsZWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDE5NTMsImV4cCI6MjA2NzMxNzk1M30.22MPxdpzCpCjJp-iyXVVsfOhuwrtRcdillW2Zkz8dIo
```

## 🧪 Test the Fix

1. Go to your deployed app: https://edunexa-qjvg-git-main-sankalp-m-tellurs-projects.vercel.app/login
2. Click "Continue with Google"
3. Should redirect to: `https://edunexa-qjvg-git-main-sankalp-m-tellurs-projects.vercel.app/auth/callback`
4. Should automatically redirect to `/home` after successful authentication

## 🔄 Code Changes Made

✅ Updated `LoginPage.jsx` to use dynamic redirect URL
✅ Added `AuthCallback` component in `App.jsx`
✅ Added `/auth/callback` route
✅ Updated `vercel.json` for production routing

## 📝 Important Notes

- The OAuth flow will work for both development (`localhost:5173`) and production (Vercel URL)
- Make sure to add both URLs to your Google OAuth redirect URIs
- The auth callback route handles the OAuth response properly
- Environment variables ensure Supabase connection works in production

## 🚀 After Fix

Once you update the Supabase and Google OAuth settings, your Google sign-in should work perfectly on your deployed app! 