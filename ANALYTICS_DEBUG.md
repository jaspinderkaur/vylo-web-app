# Analytics Debug Guide

## Quick Debug Steps

### 1. Check Console Logs
Open browser DevTools → Console and look for:
```
Analytics Debug: {
  isProd: true/false,
  analyticsEnabled: "1" or undefined,
  hostname: "your-domain.com",
  hostnameMatch: true/false
}
```

### 2. Check Environment Variables
Create a `.env` file in your project root:
```env
VITE_ENABLE_ANALYTICS=1
```

### 3. Build with Analytics Enabled
```bash
VITE_ENABLE_ANALYTICS=1 npm run build
```

### 4. Test on Production Domain
- Deploy to `app.vylohub.com` or `vylohub.com`
- Open browser DevTools → Console
- Look for "Loading Plausible Analytics..." message

### 5. Check Network Tab
- Open DevTools → Network
- Filter by "plausible"
- Look for requests to `plausible.io/event`

### 6. Test Events
- Select a mood → Should see "mood_selected" event
- Complete a habit → Should see "habit_completed" event

## Common Issues

### Issue 1: Development Environment
**Problem**: Testing on localhost
**Solution**: Analytics only work on `*.vylohub.com` domains

### Issue 2: Missing Environment Variable
**Problem**: `VITE_ENABLE_ANALYTICS` not set
**Solution**: Set `VITE_ENABLE_ANALYTICS=1` in `.env` file

### Issue 3: Not Production Build
**Problem**: Using `npm run dev` instead of production build
**Solution**: Use `npm run build` and serve the `dist/` folder

### Issue 4: Wrong Domain
**Problem**: Testing on wrong domain
**Solution**: Must be on `*.vylohub.com` domain

## Debug Commands

```bash
# Check if analytics are enabled
echo $VITE_ENABLE_ANALYTICS

# Build with analytics
VITE_ENABLE_ANALYTICS=1 npm run build

# Serve production build
npx serve dist
```

## Expected Console Output

### ✅ Working Analytics
```
Analytics Debug: {
  isProd: true,
  analyticsEnabled: "1",
  hostname: "app.vylohub.com",
  hostnameMatch: true
}
Loading Plausible Analytics...
```

### ❌ Not Working
```
Analytics Debug: {
  isProd: false,
  analyticsEnabled: undefined,
  hostname: "localhost:3000",
  hostnameMatch: false
}
Analytics not loaded - conditions not met
```
