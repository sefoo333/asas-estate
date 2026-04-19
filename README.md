# 🏠 Asas Estate

A full-stack real estate web platform built with modern technologies, inspired by leading property portals locally and globally. The platform serves both property seekers and real estate brokers with a rich, intuitive experience.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| UI Components | Radix UI, TanStack React Query / Table |
| Backend | Next.js API Routes |
| Auth | NextAuth (Google & Facebook providers) + JWT |
| Database | PostgreSQL |
| ORM | Prisma |
| Media | Cloudinary (image uploads) |

---

## ✨ Features

### 🔍 For Property Seekers

- **Map-Based Search** — Browse properties visually on an interactive map centered around your current location
- **Advanced Filters** — Search by location, price range, property type (villa, apartment, etc.), keywords, and custom attributes
- **Browse by Category** — Filter listings by transaction type: `buy`, `rent`, or `commercial`
- **Property Detail Page** — Full property info including specs, amenities, pricing, and seller/broker details
- **Broker Directory** — Browse and search verified real estate brokers
- **Broker Profile Page** — View a broker's listed properties and client ratings
- **Contact Options** — Reach out via phone call, WhatsApp, or in-platform message (Lead)
- **Save Properties** — Bookmark properties to your personal account
- **Notifications** — Stay updated on activity related to your account
- **Dark Mode** — Full dark mode support
- **Account Management** — Edit and manage your personal profile

### 🧑‍💼 For Brokers

- **Application & Approval Flow** — Brokers apply to join; admin reviews and approves requests
- **Broker Dashboard** — Statistics overview including messages, open/closed deals, and active listings
- **Listings Management** — View, edit, and delete property listings
- **Add New Property** — Full property creation form with Cloudinary image upload
- **Messages Inbox** — View and manage incoming leads and inquiries
- **Ratings** — Clients can rate brokers on their profile
- **Broker Profile Settings** — Separate profile management for brokers

### 🔐 Authentication

- Email/password login
- Social login via Google and Facebook (OAuth)
- JWT-based session handling

---

## 📁 Project Structure

```text
asas-estate/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ app/
│  │  ├─ api/                     # Auth, brokers, real estates, users, leads, location
│  │  ├─ buy/                     # Buy listings page
│  │  ├─ rent/                    # Rent listings page
│  │  ├─ commercial/              # Commercial listings page
│  │  ├─ realEstats/[id]/         # Property details page
│  │  ├─ brokers/                 # Broker pages and search
│  │  ├─ settings/                # User, broker, and admin dashboard pages
│  │  └─ login/                   # Auth and onboarding pages
│  ├─ componants/                 # UI components used across the app
│  ├─ generated/prisma/           # Generated Prisma client
│  └─ lib/                        # Shared helpers (db, token, features, uploads)
├─ public/                        # Static assets
├─ package.json
├─ next.config.ts
└─ README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/asas-estate.git
cd asas-estate

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root and configure the following:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Auth
JWT_SECRET_KEY=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Database Setup

```bash
# Fresh setup
npx prisma generate
npx prisma migrate dev

# If the DB schema already exists
npx prisma db pull
npx prisma generate
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run Next.js lint checks |

---

## 🌐 Production Deployment

```bash
npm run build
npm run start
```

> Make sure all environment variables are set before deploying to production.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
