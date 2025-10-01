# Analytics QA Verification Checklist

## Overview
This checklist verifies that Plausible Analytics is working correctly across the Vylo ecosystem.

## Prerequisites
- Plausible site configured for `vylohub.com` with subdomain tracking enabled
- Production domains accessible: `vylohub.com` and `app.vylohub.com`
- Environment variable `VITE_ENABLE_ANALYTICS=1` set for production builds

## Real-time Verification

### 1. Live Visitor Tracking
- [ ] Open `vylohub.com` in browser
- [ ] Open `app.vylohub.com` in browser  
- [ ] Check Plausible dashboard → Real-time
- [ ] Confirm both domains show as live visitors
- [ ] Verify visitor appears under `vylohub.com` (not separate sites)

## Network Tab Verification

### 2. Open DevTools → Network Tab
- [ ] Filter by "plausible" to see all analytics requests
- [ ] Confirm requests go to `plausible.io/event`

### 3. Page Load Events
- [ ] **Landing page**: Load `vylohub.com` → see `pageview` request
- [ ] **App page**: Load `app.vylohub.com` → see `pageview` request
- [ ] **SPA navigation**: Navigate within app → see additional `pageview` requests

### 4. Custom Event Tracking

#### Mood Selection
- [ ] Go to `app.vylohub.com`
- [ ] Click any mood button (tired/focused/stressed)
- [ ] Verify Network tab shows `mood_selected` event
- [ ] Confirm request payload contains `mood` prop

#### Habit Completion  
- [ ] Select a mood to see habits
- [ ] Click "I did it!" on any habit
- [ ] Verify Network tab shows `habit_completed` event
- [ ] Confirm request payload contains `mood` and `habit_title` props

#### Waitlist Signup (Landing Page)
- [ ] Go to `vylohub.com`
- [ ] Submit waitlist form (if present)
- [ ] Verify Network tab shows `waitlist_signup` event
- [ ] Confirm request payload contains `source: 'landing_page'` prop

## Development Environment Verification

### 5. Localhost Guards
- [ ] Run `npm run dev` (localhost:3000)
- [ ] Open DevTools → Network → filter by "plausible"
- [ ] Perform all actions (mood selection, habit completion)
- [ ] **Confirm NO plausible requests are sent**
- [ ] Verify no analytics events appear in Plausible dashboard

### 6. Production Build Guards
- [ ] Build without `VITE_ENABLE_ANALYTICS=1`
- [ ] Deploy to production domain
- [ ] **Confirm NO analytics events are sent**
- [ ] Verify no requests to `plausible.io` in Network tab

## Plausible Dashboard Verification

### 7. Custom Events in Dashboard
- [ ] Go to Plausible dashboard → Custom Events
- [ ] Look for `mood_selected` events
- [ ] Look for `habit_completed` events  
- [ ] Look for `waitlist_signup` events
- [ ] Click on each event to see props/details

### 8. Event Properties
- [ ] **mood_selected**: Verify `mood` prop shows correct values (tired/focused/stressed)
- [ ] **habit_completed**: Verify `mood` and `habit_title` props are populated
- [ ] **waitlist_signup**: Verify `source` prop shows "landing_page"

## Troubleshooting

### Common Issues
- **No events in Network tab**: Check `VITE_ENABLE_ANALYTICS=1` is set
- **Events not appearing in dashboard**: Wait 5-10 minutes for data processing
- **localhost events**: Check hostname guards are working
- **Missing props**: Verify event tracking calls include correct parameters

### Debug Commands
```javascript
// Check if Plausible is loaded
console.log(typeof window.plausible);

// Test event manually
window.plausible('test_event', { props: { test: true } });
```

## Expected Results

### ✅ Success Indicators
- Live visitors appear in real-time dashboard
- Network requests show correct event names and props
- No events sent from localhost/development
- Custom events visible in Plausible dashboard with proper props
- Pageview tracking works for SPA navigation

### ❌ Failure Indicators  
- No live visitors in dashboard
- Missing Network requests for events
- Events sent from localhost
- Missing or incorrect event props
- No custom events in dashboard

## Notes
- Plausible data can take 5-10 minutes to appear in dashboard
- Use incognito/private browsing to avoid cached analytics
- Clear browser cache if events aren't firing
- Check browser console for JavaScript errors
