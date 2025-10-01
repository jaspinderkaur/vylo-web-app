# Habit Import Guide

## 🚀 How to Import Habits from CSV to Firestore

### **Step 1: Set up Environment Variables**

Create a `.env` file in your project root with your Firebase configuration:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# Analytics
VITE_ENABLE_ANALYTICS=1
```

### **Step 2: Run the Import Script**

```bash
npm run import-habits
```

### **Step 3: Verify Import**

1. **Check Firebase Console** - Go to your Firestore database
2. **Look for 'habits' collection** - Should contain 37 new habits
3. **Test the app** - Select different moods to see new habits

## 📊 **What Gets Imported**

The script will import **37 habits** from `src/vylo_habits_batch2.csv`:

- **12 tired habits** (low, medium, high intensity)
- **12 focused habits** (low, medium, high intensity)  
- **13 stressed habits** (low, medium, high intensity)

## 🔧 **Script Features**

- **Automatic parsing** of CSV data
- **Error handling** for failed imports
- **Progress logging** for each habit
- **Environment variable** configuration
- **Firestore integration** with your existing setup

## 🎯 **Expected Output**

```
Found 37 habits to import
✅ Imported: Blink + gaze reset (ID: abc123...)
✅ Imported: Desk calf pumps (ID: def456...)
...
🎉 Successfully imported 37 habits!
```

## 🚨 **Troubleshooting**

### **If you get Firebase errors:**
- Check your `.env` file has correct Firebase config
- Verify your Firebase project is active
- Ensure Firestore is enabled in your Firebase project

### **If you get CSV errors:**
- Check that `src/vylo_habits_batch2.csv` exists
- Verify the CSV format matches the expected structure

### **If you get permission errors:**
- Make sure your Firebase project allows writes
- Check your Firebase security rules
