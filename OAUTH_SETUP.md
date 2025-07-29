# Fixing OAuth Redirect URL Issue

## Problem
Google OAuth is redirecting to `localhost:3000` instead of your development server port `5173`.

## Solution

### 1. Update Supabase OAuth Settings

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `xvrnnvasjqsonyixlelf`
3. Go to **Authentication** → **URL Configuration**
4. Update the **Site URL** to:
   - Development: `http://localhost:5173`
   - Production: `https://your-vercel-domain.vercel.app`

### 2. Update Google OAuth Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Click on **Google**
3. Add these redirect URLs to your Google OAuth configuration:
   - `http://localhost:5173/auth/callback`
   - `https://your-vercel-domain.vercel.app/auth/callback`

### 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Add these **Authorized redirect URIs**:
   - `http://localhost:5173/auth/callback`
   - `https://your-vercel-domain.vercel.app/auth/callback`

## Code Changes Made

✅ Updated `LoginPage.jsx` to specify redirect URL
✅ Added `AuthCallback` component in `App.jsx`
✅ Added `/auth/callback` route
✅ Updated `vercel.json` for production routing

## Testing

1. Start your development server: `npm run dev`
2. Try Google OAuth login
3. Should redirect to `http://localhost:5173/auth/callback`
4. Should automatically redirect to `/home` after successful authentication

## For Production Deployment

When you deploy to Vercel, make sure to:
1. Update the Site URL in Supabase to your Vercel domain
2. Add your Vercel domain to Google OAuth redirect URIs
3. The redirect URL will be: `https://your-domain.vercel.app/auth/callback` 