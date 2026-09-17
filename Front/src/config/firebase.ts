import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

// DigitalStoreLK Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDkRXOXQZfUGmRCkeNA-4afLywIAgwhiWE",
  authDomain: "digitalstorelk-web.firebaseapp.com",
  projectId: "digitalstorelk-web",
  storageBucket: "digitalstorelk-web.firebasestorage.app",
  messagingSenderId: "254891102600",
  appId: "1:254891102600:web:93523fbc3d6979eaad6a3d",
  measurementId: "G-KKQX97QXY8"
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
