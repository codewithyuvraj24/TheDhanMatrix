/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Config populated via URL params or hardcoded if necessary
// Ideally this should match your env but SW has limited access to build env
// For this MVP we will try to use the self.registration context or default
// NOTE: You must replace these with your actual values if not using a build step that injects them
// or fetch them. For simplicity in this demo, I'll use placeholders that the user must fill
// or we can rely on default if hosted on Firebase Hosting (which auto-configures).
// Since this is Next.js Vercel, we need explicit config.

// WARNING: Ensure THESE VALUES MATCH your .env.local for local testing
// In production, these should be injected or fetched.
const firebaseConfig = {
    apiKey: "REPLACE_WITH_YOUR_KEY",
    authDomain: "dhanmatrix-73894.firebaseapp.com",
    projectId: "dhanmatrix-73894",
    storageBucket: "dhanmatrix-73894.appspot.com",
    messagingSenderId: "1977021501",
    appId: "1:1977021501:web:2123d242765360980590a3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192.png',
        badge: '/icon-192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
