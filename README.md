# 💎 Dhanmatrixcapital

> A premium wealth management platform built with Next.js 14, Firebase, and cutting-edge UI technologies.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism Design** - Frosted glass aesthetic with backdrop blur throughout
- **Magnetic Buttons** - Physics-based hover interactions using Framer Motion
- **Premium Toasts** - Elegant notification system with auto-dismiss
- **Dark Mode** - Seamless theme switching with persistent preferences
- **Responsive Design** - Mobile-first approach with smooth breakpoints

### 💰 Wealth Management Tools
- **Investment Goal Tracker** - Animated circular progress ring with editable targets
- **ROI Calculator** - Interactive compound interest projections with real-time charts
- **Portfolio Health Gauge** - Semicircular health score visualization
- **CSV Export** - One-click portfolio data download
- **Investment Dashboard** - Comprehensive overview with animated stats

### 🔐 Authentication & Security
- **Firebase Authentication** - Email/Password and Google Sign-In
- **Protected Routes** - Client-side route protection
- **Role-Based Access** - User and Admin roles with separate panels
- **Secure Firestore** - Server-side security rules

### 📊 Data Visualization
- **Recharts Integration** - Interactive area charts and pie charts
- **Real-time Updates** - Live data synchronization with Firestore
- **Animated Transitions** - Smooth chart animations and state changes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/Dhanmatrixcapital.git
cd Dhanmatrixcapital
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Set up Firestore**

Apply security rules from `firestore.rules` to your Firebase project.

Create an admin user by adding a document:
```
Collection: admins
Document ID: <your-user-uid>
Fields: (empty or add metadata)
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Dhanmatrixcapital/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── dashboard/         # User dashboard
│   │   ├── admin/             # Admin panel
│   │   ├── profile/           # User profile
│   │   └── layout.tsx         # Root layout with providers
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Animations.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── PremiumToast.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── features/          # Feature-specific components
│   │   │   ├── Charts.tsx
│   │   │   ├── GoalTracker.tsx
│   │   │   ├── ROICalculator.tsx
│   │   │   └── PortfolioHealth.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── BackgroundOrbs.tsx
│   │   └── auth/              # Auth components
│   │       └── ProtectedRoute.tsx
│   ├── context/               # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/                   # Utilities and configs
│   │   ├── firebase.ts
│   │   └── validators.ts
│   └── styles/
│       └── globals.css
├── public/                    # Static assets
└── firestore.rules           # Firestore security rules
```

## 🎯 Key Technologies

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 3.0
- **Animations:** Framer Motion 12
- **Charts:** Recharts 3.6
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Icons:** Lucide React
- **Font:** Josefin Sans (Google Fonts)

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## 🎨 Design System

### Colors
- **Primary:** Blue (#3B82F6)
- **Success:** Emerald (#10B981)
- **Warning:** Amber (#F59E0B)
- **Error:** Red (#EF4444)
- **Accent:** Purple (#8B5CF6)

### Typography
- **Font Family:** Josefin Sans
- **Weights:** 400 (Regular), 700 (Bold), 900 (Black)

### Glassmorphism
```css
bg-white/70 dark:bg-white/5
backdrop-blur-xl
border border-white/20 dark:border-white/10
```

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) - Landing page with hero section and features
- **About** (`/about`) - Company mission and values
- **Contact** (`/contact`) - Contact form and information
- **Plans** (`/plans`) - Pricing and subscription tiers

### Protected Pages
- **Dashboard** (`/dashboard`) - Investment overview with wealth tools
- **Profile** (`/profile`) - User settings and account management
- **Admin** (`/admin`) - Investment management panel (admin only)

## 🔐 Security

- **Firestore Rules:** Server-side validation for all database operations
- **Protected Routes:** Client-side route guards for authenticated pages
- **Environment Variables:** Sensitive config stored in `.env.local`
- **Role-Based Access:** Admin privileges managed via Firestore collection

## 🚧 Limitations & Notes

- **No Payment Integration:** This is a portfolio management tool without real payment processing
- **Display-Only Financials:** Investment data is for tracking purposes only
- **Admin Management:** Admins can manually update investment records via the Admin Panel
- **No Automated Withdrawals:** All transactions are manual entries

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Recharts](https://recharts.org/) - Chart library
- [Lucide](https://lucide.dev/) - Icon library

---

**Built with 💎 by Dhanmatrixcapital Team**
