import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to parse CSV and import habits
async function importHabits() {
  const habits = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream('./src/vylo_habits_batch2.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Convert CSV row to habit object
        const habit = {
          mood: row.mood,
          intensity: row.intensity,
          title: row.title,
          duration: row.duration,
          instructions: row.instructions,
          tags: row.tags.split(',').map(tag => tag.trim()),
          dopamine_hook: row.dopamine_hook,
          metric: row.metric,
          contraindications: row.contraindications,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        habits.push(habit);
      })
      .on('end', async () => {
        console.log(`Found ${habits.length} habits to import`);
        
        try {
          // Import each habit to Firestore
          for (const habit of habits) {
            const docRef = await addDoc(collection(db, 'habits'), habit);
            console.log(`✅ Imported: ${habit.title} (ID: ${docRef.id})`);
          }
          
          console.log(`🎉 Successfully imported ${habits.length} habits!`);
          resolve();
        } catch (error) {
          console.error('❌ Error importing habits:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV:', error);
        reject(error);
      });
  });
}

// Run the import
importHabits()
  .then(() => {
    console.log('Import completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });
