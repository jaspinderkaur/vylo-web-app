# Vylo Analytics Setup with Plausible

## Overview
We're using Plausible Analytics for privacy-friendly tracking across the Vylo ecosystem. This document outlines the setup and implementation strategy.

## Plausible Site Configuration

### Option 1: Single Site (Recommended)
- **Site Domain**: `vylohub.com`
- **Settings**: Enable "Track subdomains" in Plausible dashboard
- **Result**: All traffic from `app.vylohub.com` rolls into the main `vylohub.com` site
- **Benefits**: Unified analytics view, easier reporting

### Option 2: Separate Sites
- **Main Site**: `vylohub.com` (landing page)
- **App Site**: `app.vylohub.com` (Vite app)
- **Result**: Separate analytics for each domain
- **Benefits**: Granular tracking, separate user journeys

## Custom Events

### Event Schema
```javascript
// Mood Selection
window.plausible('mood_selected', {
  props: { mood: 'tired' | 'focused' | 'stressed' }
});

// Habit Completion
window.plausible('habit_completed', {
  props: { 
    mood: 'tired' | 'focused' | 'stressed',
    habit_title: 'Gentle Stretch'
  }
});

// Waitlist Signup (landing page only)
window.plausible('waitlist_signup', {
  props: { source: 'landing_page' }
});
```

### Event Tracking Implementation

#### Vite App (app.vylohub.com)
- **Script Location**: `src/main.tsx` (already implemented)
- **Events Tracked**: `mood_selected`, `habit_completed`
- **Implementation**: 
  ```javascript
  // Already implemented in src/services/analytics.ts
  trackMoodSelected(mood);
  trackHabitCompleted(habitId, mood);
  ```

#### Landing Page (vylohub.com)
- **Script Location**: Add to `<head>` of landing page
- **Events Tracked**: `waitlist_signup`
- **Implementation**:
  ```html
  <script defer data-domain="vylohub.com" src="https://plausible.io/js/script.js"></script>
  <script>
    // Track waitlist signup
    function trackWaitlistSignup() {
      window.plausible('waitlist_signup', {
        props: { source: 'landing_page' }
      });
    }
  </script>
  ```

## Script Injection Strategy

### Vite App (app.vylohub.com)
```javascript
// src/main.tsx - Already implemented
const script = document.createElement('script');
script.defer = true;
script.dataset.domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'localhost';
script.src = 'https://plausible.io/js/script.js';
document.head.appendChild(script);
```

### Landing Page (vylohub.com)
```html
<!-- Add to <head> section -->
<script defer data-domain="vylohub.com" src="https://plausible.io/js/script.js"></script>
```

## Verification Methods

### 1. Plausible Real-time Dashboard
- Go to Plausible dashboard → Real-time
- Perform actions in the app
- Watch for custom events appearing in real-time
- Events should show: `mood_selected`, `habit_completed`

### 2. Browser Network Tab
1. Open Chrome DevTools → Network tab
2. Filter by "plausible.io"
3. Perform actions in the app:
   - Select a mood → Look for `mood_selected` event
   - Complete a habit → Look for `habit_completed` event
4. Verify request payload contains correct props

### 3. Console Verification
```javascript
// Check if Plausible is loaded
console.log(typeof window.plausible); // Should return 'function'

// Test event firing
window.plausible('test_event', { props: { test: true } });
```

## Environment Variables

### Vite App (.env)
```env
VITE_PLAUSIBLE_DOMAIN=vylohub.com
```

### Landing Page
No environment variables needed - hardcode domain in script tag.

## Expected Analytics Data

### Page Views
- `vylohub.com/` - Landing page visits
- `app.vylohub.com/` - App visits

### Custom Events
- **mood_selected**: Track which moods users choose most
- **habit_completed**: Measure habit completion rates
- **waitlist_signup**: Track conversion from landing to signup

### Key Metrics to Monitor
- Mood selection distribution
- Habit completion rates by mood
- User engagement patterns
- Conversion funnel (landing → app → completion)

## Troubleshooting

### Common Issues
1. **Events not firing**: Check browser console for errors
2. **Domain mismatch**: Verify `data-domain` attribute matches Plausible site
3. **CORS issues**: Ensure script is loaded from HTTPS
4. **Ad blockers**: Some users may have Plausible blocked

### Debug Steps
1. Check Network tab for `plausible.io/event` requests
2. Verify `window.plausible` function exists
3. Test with Plausible's real-time dashboard
4. Check browser console for JavaScript errors

## Privacy Compliance

Plausible is GDPR/CCPA compliant by default:
- No cookies required
- No personal data collection
- IP addresses anonymized
- Data stored in EU (if using EU servers)

No additional privacy setup required for Vylo implementation.
