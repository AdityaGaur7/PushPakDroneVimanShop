// src/app/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz_AdxHWKrWC4JylDiad74fwKg-aXDNN4",
  authDomain: "pushpakvimandrone.firebaseapp.com",
  projectId: "pushpakvimandrone",
  storageBucket: "pushpakvimandrone.appspot.com",
  messagingSenderId: "618170765636",
  appId: "1:618170765636:web:9816a8f77517d40a824711",
  measurementId: "G-X1RE7BFWBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize analytics only if supported
let analytics;
if (typeof window !== 'undefined') {
  isAnalyticsSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { storage, analytics };
