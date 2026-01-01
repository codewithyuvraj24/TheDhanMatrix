# 🚀 Deployment & Setup Guide

## Step 1: Add Google Analytics ID

1. **Get your Google Analytics 4 ID:**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create a new property (if you haven't already)
   - Click "Admin" → "Data Streams" → Select your web stream
   - Copy the **Measurement ID** (starts with `G-`)

2. **Add to your `.env.local` file:**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Verify it's working:**
   ```bash
   npm run dev
   ```
   - Open browser DevTools → Network tab
   - Visit your site
   - Look for requests to `googletagmanager.com`

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "feat: add PWA, SEO, analytics, and performance optimizations"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from your `.env.local`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - `NEXT_PUBLIC_GA_ID`
     - `NEXT_PUBLIC_FORMSPREE_ID`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to link project
# Add environment variables when prompted
```

---

## Step 3: Submit Sitemap to Google Search Console

1. **Add your site to Google Search Console:**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Click "Add Property"
   - Enter your Vercel URL: `https://dhanmatrixcapital.vercel.app`

2. **Verify ownership:**
   - Choose "HTML tag" method
   - Copy the verification code
   - Add to your `layout.tsx` metadata:
     ```typescript
     verification: {
       google: 'your-verification-code',
     }
     ```
   - Redeploy to Vercel
   - Click "Verify" in Search Console

3. **Submit your sitemap:**
   - In Search Console → Sitemaps
   - Add new sitemap: `https://dhanmatrixcapital.vercel.app/sitemap.xml`
   - Click "Submit"
   - Google will start indexing your pages

---

## Step 4: Test PWA Installation on Mobile

### iOS (Safari):

1. **Visit your deployed site** on iPhone/iPad
2. **Tap the Share button** (square with arrow)
3. **Scroll down** and tap "Add to Home Screen"
4. **Tap "Add"** in the top right
5. **Test the app:**
   - Icon should appear on home screen
   - Tap to open (should open without Safari UI)
   - Test offline: turn on Airplane mode and reload

### Android (Chrome):

1. **Visit your deployed site** on Android device
2. **Look for install prompt** at bottom of screen
   - Or tap menu (⋮) → "Install app" or "Add to Home screen"
3. **Tap "Install"**
4. **Test the app:**
   - Icon should appear in app drawer
   - Tap to open (should open as standalone app)
   - Test offline: turn on Airplane mode and reload

### Desktop (Chrome/Edge):

1. **Visit your deployed site**
2. **Look for install icon** in address bar (⊕ or computer icon)
3. **Click "Install"**
4. **App opens in its own window**

---

## Verification Checklist

After deployment, verify everything works:

### ✅ PWA
- [ ] Install prompt appears on mobile
- [ ] App installs successfully
- [ ] Icon looks correct on home screen
- [ ] App opens without browser UI
- [ ] Theme color matches (#3B82F6)

### ✅ SEO
- [ ] `/sitemap.xml` is accessible
- [ ] `/robots.txt` is accessible
- [ ] Open Graph preview works: [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Twitter card preview works
- [ ] Google Search Console shows sitemap

### ✅ Analytics
- [ ] Google Analytics dashboard shows real-time users
- [ ] Page views are being tracked
- [ ] Custom events fire (test by creating investment)

### ✅ Performance
- [ ] Lighthouse score 90+ (run in incognito)
- [ ] Dashboard loads quickly with skeleton screens
- [ ] No console errors
- [ ] Security headers: [securityheaders.com](https://securityheaders.com)

### ✅ Security
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers present (check with browser DevTools)
- [ ] Firebase rules are secure
- [ ] Environment variables are set

---

## Troubleshooting

### PWA not showing install prompt?
- Check manifest.json is accessible: `https://dhanmatrixcapital.vercel.app/manifest.json`
- Verify HTTPS is enabled
- Check browser console for errors
- Try in incognito mode

### Analytics not tracking?
- Verify `NEXT_PUBLIC_GA_ID` is set in Vercel
- Check Network tab for `gtag/js` requests
- Wait 24-48 hours for data to appear in GA dashboard
- Test in production (analytics disabled in dev mode)

### Build failing on Vercel?
- Check build logs for errors
- Verify all environment variables are set
- Test build locally: `npm run build`
- Check Node.js version matches (18+)

### Sitemap not found?
- Verify `/sitemap.xml` works locally
- Clear Vercel cache and redeploy
- Check Next.js version (14+)

---

## Optional: Custom Domain

1. **Buy a domain** (Namecheap, GoDaddy, etc.)
2. **Add to Vercel:**
   - Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions
3. **Update metadata:**
   - Change `metadataBase` in `layout.tsx` to your domain
   - Update sitemap URLs
   - Redeploy

---

## Next: Phase 3 Features

Once deployment is complete, we can implement:
- 📰 **Market News Widget** - Real-time financial news
- 🔄 **Investment Comparison Tool** - Side-by-side plan comparison
- 🔔 **Push Notifications** - Investment updates and alerts
- 📚 **Onboarding Flow** - Welcome wizard for new users

Ready to proceed with Phase 3? Let me know! 🚀
