# Dashboard Project

A Next.js-based dashboard application with search functionality for agencies and contacts, featuring authentication and rate limiting.

## ⚠️ **IMPORTANT NOTICE**

**This project will NOT work correctly at the moment because the database has been stopped.** 

The application relies on Supabase for data storage and retrieval. Without an active database connection, the following features will fail:
- User authentication and authorization
- Search functionality for agencies and contacts
- Data fetching and display
- Profile management
- All API routes that depend on database queries

To restore functionality, you would need to start the Supabase database instance and ensure the connection credentials are properly configured.

---

## Features

- 🔐 **Authentication**: Clerk integration for user management
- 🔍 **Search Functionality**: Search for agencies and contacts
- 📊 **Dashboard**: View and manage agencies and contacts
- 🎨 **Modern UI**: Built with Tailwind CSS
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Rate Limiting**: API rate limiting implementation
- 🎯 **Profile Management**: User profile viewing and management

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: React 19

## Project Structure

```
dashboard/
├── app/
│   ├── api/                    # API routes
│   │   ├── limit/              # Rate limiting logic
│   │   └── search/             # Search endpoints
│   │       ├── agencies/       # Agency search
│   │       └── contacts/       # Contact search
│   ├── dashboard/              # Dashboard pages
│   │   ├── components/         # Dashboard components
│   │   ├── agencies/[id]/      # Agency detail pages
│   │   └── contacts/[id]/      # Contact detail pages
│   ├── upgrade/                # Upgrade/pricing page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── lib/
│   └── supabaseClient.ts       # Supabase configuration
└── public/                     # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard
```

2. Install dependencies:
```bash
npm install --force
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Supabase (Currently Stopped - See Warning Above)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Routes

### Search APIs
- `GET /api/search/agencies` - Search for agencies
- `GET /api/search/agencies/[id]` - Get agency by ID
- `GET /api/search/contacts` - Search for contacts
- `GET /api/search/contacts/[id]` - Get contact by ID

### Rate Limiting
- `POST /api/limit` - Rate limiting endpoint

## Key Components

- **NavBar** - Top navigation with search
- **LeftMenu** - Sidebar navigation
- **SearchInput** - Search functionality
- **List** - Data listing component
- **Profile** - User profile display
- **MultiPageControl** - Pagination controls
- **UpgradeBanner** - Upgrade prompt banner

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

Private project - All rights reserved
