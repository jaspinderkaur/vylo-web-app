# Vylo - Micro-habits for your mood

A playful, mobile-first web app that provides adaptive micro-habits based on your current mood. Built with Vite, React, TypeScript, and Firebase.

## Features

- 🎯 **Mood-based habits**: Choose from tired, focused, or stressed
- ✨ **Dopamine animations**: Satisfying confetti bursts when completing habits
- 📱 **Mobile-first design**: Optimized for mobile devices
- 🎨 **Playful futurism**: Beautiful gradient design with yellow accents
- 📊 **Privacy-friendly analytics**: Plausible analytics integration
- ♿ **Accessible**: ARIA labels and keyboard navigation

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Firebase**:
   - Follow the guide in `firebase-setup.md`
   - Create a `.env` file with your Firebase configuration
   - Add sample habits to your Firestore database

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Database**: Firebase Firestore
- **Analytics**: Plausible
- **Animations**: Canvas-confetti
- **Styling**: Custom CSS with gradients

## Project Structure

```
src/
├── components/          # React components
│   ├── MoodSelector.tsx    # Mood selection UI
│   ├── HabitCard.tsx       # Individual habit display
│   └── DopamineAnimation.tsx # Confetti animation
├── hooks/               # Custom React hooks
│   └── useFirestore.ts     # Firestore data fetching
├── services/            # External services
│   ├── firebase.ts         # Firebase configuration
│   └── analytics.ts        # Plausible analytics
├── types/               # TypeScript definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── confetti.ts         # Animation utilities
├── App.tsx              # Main application
├── App.css              # Styling
└── main.tsx             # Entry point
```

## Environment Variables

Create a `.env` file with:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_PLAUSIBLE_DOMAIN=your_domain
```

## Firebase Data Structure

The app expects a `habits` collection in Firestore with documents containing:

```typescript
{
  title: string;           // Habit name
  duration: string;        // Time to complete
  instructions: string;    // How to do it
  dopamine_hook: string;   // Motivational message
  mood: 'tired' | 'focused' | 'stressed';
}
```

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

## License

MIT License - see LICENSE file for details.