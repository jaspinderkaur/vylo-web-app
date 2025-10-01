# Firebase Setup Guide for Vylo

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "vylo-habits" (or your preferred name)
4. Enable Google Analytics (optional)
5. Create the project

## 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users

## 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (</>) 
4. Register app with name "vylo-web"
5. Copy the config object

## 4. Environment Variables

Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_actual_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
VITE_FIREBASE_APP_ID=your_actual_app_id

VITE_PLAUSIBLE_DOMAIN=localhost
```

## 5. Sample Data Structure

Create a collection called `habits` in Firestore with these sample documents:

### Tired Mood Habits:
```json
{
  "title": "Gentle Stretch",
  "duration": "2 minutes",
  "instructions": "Stand up and reach for the sky, then gently roll your shoulders back.",
  "dopamine_hook": "Feel your body thanking you for the movement",
  "mood": "tired"
}
```

```json
{
  "title": "Deep Breathing",
  "duration": "1 minute", 
  "instructions": "Take 4 slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.",
  "dopamine_hook": "Notice how your mind feels clearer with each breath",
  "mood": "tired"
}
```

```json
{
  "title": "Hydration Break",
  "duration": "30 seconds",
  "instructions": "Drink a full glass of water and take a moment to appreciate the refreshment.",
  "dopamine_hook": "Feel the energy flowing back into your body",
  "mood": "tired"
}
```

### Focused Mood Habits:
```json
{
  "title": "Power Pose",
  "duration": "1 minute",
  "instructions": "Stand tall with hands on hips, chest out. Hold this confident pose.",
  "dopamine_hook": "Feel your confidence and energy building",
  "mood": "focused"
}
```

```json
{
  "title": "Goal Visualization",
  "duration": "2 minutes",
  "instructions": "Close your eyes and vividly imagine achieving your main goal today.",
  "dopamine_hook": "Feel the excitement of success already happening",
  "mood": "focused"
}
```

```json
{
  "title": "Quick Planning",
  "duration": "3 minutes",
  "instructions": "Write down your top 3 priorities for the next hour.",
  "dopamine_hook": "Feel the clarity and direction this gives you",
  "mood": "focused"
}
```

### Stressed Mood Habits:
```json
{
  "title": "Box Breathing",
  "duration": "2 minutes",
  "instructions": "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
  "dopamine_hook": "Feel the stress melting away with each cycle",
  "mood": "stressed"
}
```

```json
{
  "title": "Gratitude Moment",
  "duration": "1 minute",
  "instructions": "Think of 3 things you're grateful for right now, no matter how small.",
  "dopamine_hook": "Feel the warmth of appreciation filling your heart",
  "mood": "stressed"
}
```

```json
{
  "title": "Gentle Self-Talk",
  "duration": "1 minute",
  "instructions": "Place your hand on your heart and say 'I'm doing my best, and that's enough.'",
  "dopamine_hook": "Feel the self-compassion washing over you",
  "mood": "stressed"
}
```

## 6. Security Rules (Optional)

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /habits/{document} {
      allow read: if true; // Public read for habits
    }
  }
}
```

## 7. Test the Setup

1. Run `npm install` to install dependencies
2. Copy the sample data into your Firestore
3. Run `npm run dev` to start the development server
4. Test mood selection and habit fetching
