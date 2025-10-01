# How to Add Sample Habit Data to Firestore

You have **3 easy options** to add the sample habit data to your Firestore database:

## Option 1: 🚀 Automated Script (Recommended)

### Step 1: Update the import script with your Firebase config
Edit `firestore-data-import.js` and replace the config object with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### Step 2: Run the import script
```bash
npm run import-data
```

This will automatically add all 15 sample habits to your Firestore database!

---

## Option 2: 🖱️ Firebase Console (Manual)

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to "Firestore Database"

### Step 2: Create the habits collection
1. Click "Start collection"
2. Collection ID: `habits`
3. Click "Next"

### Step 3: Add each habit document
For each habit below, click "Add document" and fill in the fields:

#### Tired Mood Habits:

**Document 1:**
- Field: `title` → Value: `Gentle Stretch`
- Field: `duration` → Value: `2 minutes`
- Field: `instructions` → Value: `Stand up and reach for the sky, then gently roll your shoulders back.`
- Field: `dopamine_hook` → Value: `Feel your body thanking you for the movement`
- Field: `mood` → Value: `tired`

**Document 2:**
- Field: `title` → Value: `Deep Breathing`
- Field: `duration` → Value: `1 minute`
- Field: `instructions` → Value: `Take 4 slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.`
- Field: `dopamine_hook` → Value: `Notice how your mind feels clearer with each breath`
- Field: `mood` → Value: `tired`

**Document 3:**
- Field: `title` → Value: `Hydration Break`
- Field: `duration` → Value: `30 seconds`
- Field: `instructions` → Value: `Drink a full glass of water and take a moment to appreciate the refreshment.`
- Field: `dopamine_hook` → Value: `Feel the energy flowing back into your body`
- Field: `mood` → Value: `tired`

#### Focused Mood Habits:

**Document 4:**
- Field: `title` → Value: `Power Pose`
- Field: `duration` → Value: `1 minute`
- Field: `instructions` → Value: `Stand tall with hands on hips, chest out. Hold this confident pose.`
- Field: `dopamine_hook` → Value: `Feel your confidence and energy building`
- Field: `mood` → Value: `focused`

**Document 5:**
- Field: `title` → Value: `Goal Visualization`
- Field: `duration` → Value: `2 minutes`
- Field: `instructions` → Value: `Close your eyes and vividly imagine achieving your main goal today.`
- Field: `dopamine_hook` → Value: `Feel the excitement of success already happening`
- Field: `mood` → Value: `focused`

**Document 6:**
- Field: `title` → Value: `Quick Planning`
- Field: `duration` → Value: `3 minutes`
- Field: `instructions` → Value: `Write down your top 3 priorities for the next hour.`
- Field: `dopamine_hook` → Value: `Feel the clarity and direction this gives you`
- Field: `mood` → Value: `focused`

#### Stressed Mood Habits:

**Document 7:**
- Field: `title` → Value: `Box Breathing`
- Field: `duration` → Value: `2 minutes`
- Field: `instructions` → Value: `Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.`
- Field: `dopamine_hook` → Value: `Feel the stress melting away with each cycle`
- Field: `mood` → Value: `stressed`

**Document 8:**
- Field: `title` → Value: `Gratitude Moment`
- Field: `duration` → Value: `1 minute`
- Field: `instructions` → Value: `Think of 3 things you're grateful for right now, no matter how small.`
- Field: `dopamine_hook` → Value: `Feel the warmth of appreciation filling your heart`
- Field: `mood` → Value: `stressed`

**Document 9:**
- Field: `title` → Value: `Gentle Self-Talk`
- Field: `duration` → Value: `1 minute`
- Field: `instructions` → Value: `Place your hand on your heart and say 'I'm doing my best, and that's enough.'`
- Field: `dopamine_hook` → Value: `Feel the self-compassion washing over you`
- Field: `mood` → Value: `stressed`

---

## Option 3: 📋 Copy-Paste JSON (Advanced)

If you're comfortable with JSON, you can use the Firebase CLI or any Firestore admin tool to import this JSON:

```json
{
  "habits": [
    {
      "title": "Gentle Stretch",
      "duration": "2 minutes", 
      "instructions": "Stand up and reach for the sky, then gently roll your shoulders back.",
      "dopamine_hook": "Feel your body thanking you for the movement",
      "mood": "tired"
    },
    {
      "title": "Deep Breathing",
      "duration": "1 minute",
      "instructions": "Take 4 slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.",
      "dopamine_hook": "Notice how your mind feels clearer with each breath", 
      "mood": "tired"
    },
    {
      "title": "Hydration Break",
      "duration": "30 seconds",
      "instructions": "Drink a full glass of water and take a moment to appreciate the refreshment.",
      "dopamine_hook": "Feel the energy flowing back into your body",
      "mood": "tired"
    },
    {
      "title": "Power Pose", 
      "duration": "1 minute",
      "instructions": "Stand tall with hands on hips, chest out. Hold this confident pose.",
      "dopamine_hook": "Feel your confidence and energy building",
      "mood": "focused"
    },
    {
      "title": "Goal Visualization",
      "duration": "2 minutes", 
      "instructions": "Close your eyes and vividly imagine achieving your main goal today.",
      "dopamine_hook": "Feel the excitement of success already happening",
      "mood": "focused"
    },
    {
      "title": "Quick Planning",
      "duration": "3 minutes",
      "instructions": "Write down your top 3 priorities for the next hour.",
      "dopamine_hook": "Feel the clarity and direction this gives you",
      "mood": "focused"
    },
    {
      "title": "Box Breathing",
      "duration": "2 minutes",
      "instructions": "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
      "dopamine_hook": "Feel the stress melting away with each cycle",
      "mood": "stressed"
    },
    {
      "title": "Gratitude Moment",
      "duration": "1 minute",
      "instructions": "Think of 3 things you're grateful for right now, no matter how small.",
      "dopamine_hook": "Feel the warmth of appreciation filling your heart",
      "mood": "stressed"
    },
    {
      "title": "Gentle Self-Talk",
      "duration": "1 minute", 
      "instructions": "Place your hand on your heart and say 'I'm doing my best, and that's enough.'",
      "dopamine_hook": "Feel the self-compassion washing over you",
      "mood": "stressed"
    }
  ]
}
```

---

## ✅ Verify Your Data

After adding the data, you should see:
- **9 documents** in the `habits` collection
- **3 habits** for each mood (tired, focused, stressed)
- Each document has: `title`, `duration`, `instructions`, `dopamine_hook`, `mood`

## 🚀 Test Your App

Once the data is added:
1. Create your `.env` file with Firebase credentials
2. Run `npm run dev`
3. Open `http://localhost:3000`
4. Select a mood and see your habits appear!

**Recommended: Use Option 1 (Automated Script)** - it's the fastest and most reliable method! 🎯
