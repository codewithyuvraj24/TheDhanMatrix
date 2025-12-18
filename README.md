# TheDhanMatrix - Next.js + Firebase

Local setup

1. Create a Firebase project and enable Email/Password Auth and Firestore.
2. Add Firestore security rules from `firestore.rules`.
3. Create an `admins` document for admin users: `admins/<adminUid>` (empty doc).

Environment variables (create `.env.local`):

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

Install and run

```bash
npm install
npm run dev
```

Notes
- No payment gateways or automatic withdrawals are implemented.
- Financial data is display-only for users; admins can update investment documents via Admin Panel.
