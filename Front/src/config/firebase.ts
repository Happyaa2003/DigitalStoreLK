import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

// DigitalStoreLK Firebase Configuration (digitalstorelk-plans)
export const firebaseConfig = {
  apiKey: "AIzaSyDkNu2NOhUTb6PQU2Vvk1I226FvNz70JKU",
  authDomain: "digitalstorelk-plans.firebaseapp.com",
  projectId: "digitalstorelk-plans",
  storageBucket: "digitalstorelk-plans.firebasestorage.app",
  messagingSenderId: "502095391265",
  appId: "1:502095391265:web:ea21bf7bafc2557159d160",
  measurementId: "G-77DP5KGVJ2"
};

// Initialize Firebase (singleton pattern prevents duplicate initializations)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Analytics safely (only in browser environments where supported)
export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Graceful fallback if analytics is blocked by client or privacy extensions
  });
}

export default app;
