# 💸 FinIntel — AI-Powered Finance Management Platform

FinIntel is an AI-driven personal and business finance management platform that helps users track spending, set budgets, and gain intelligent insights for smarter financial decisions. Built with Next.js, Tailwind CSS, and OpenAI-powered analytics.

---

## 🌟 Key Features 

### 🔐 Authentication System
- Secure sign-in and sign-up flows using **Clerk**
- Supports multiple providers and JWT-based session management
- Dynamic route protection using **Arcjet**

---

### 📊 Interactive Dashboard
- Overview of financial data like **total balance**, **expenses**, **income**, and **budgets**
- Modular widgets:
  - 💳 **Account Cards**: Show balance, bank name, and linked transactions
  - 📈 **Budget Progress Bar**: Visual indicator of remaining budget
  - 📂 **Recent Transactions**: Preview of recent financial activities
- Clean layout using custom components and **ShadCN UI**, **Framer-Motion**

---

### 🧾 Smart Transaction Management
- Full **CRUD operations** for transactions
- Categorization of transactions (e.g., groceries, travel, rent)
- 📷 **Receipt Scanner Integration**:
  - Upload scanned bills/images
  - Extract and autofill transaction data (Using `Gemini-1.5-flash`)

---

### 🏦 Account Overview
- Create, manage multiple accounts (e.g., bank, wallet, cash)
- View **account-specific transactions** and **category summaries**
- Datewise income-expense visualization with bars

---

### 📬 Email Notifications
- Send email confirmations for critical actions
- Uses **Resend** as a Email-service and **React Email** for styled transactional emails
- Email templates built with responsive JSX

---

### 🧠 AI & Event Workflows (via Inngest)
- Background workflows handled using **Inngest**
- Example Use-Cases:
  - Notify users of **unusual expenses**
  - Trigger **Recurring** Transaction 
  - **Auto-categorize** transactions using AI
  - Schedule **budget reminders** and **Monthly Alert**

---

### 🌐 Modern Frontend
- Built using **Next.js App Router (v13+)** with layouts and parallel routing
- Global styling using **Tailwind CSS**
- Light/dark theme ready
- Custom pages:
  - Home (`/`)
  - 404 Not Found (`/not-found`)
  - Authenticated Main Layout (`/dashboard`, `/transaction`, `/account`)

---

### 🧪 Developer Ready
- 🔧 `.env.sample` provided for easy environment setup
- 🧬 **Prisma schema** for database modeling
- 📥 **Seed scripts** to preload useful data
- 🧹 **ESLint** configured for consistent code quality
- 💅 Styled using **PostCSS** and **Tailwind utilities**

---

### 🗃️ Database & ORM
- Powered by **PostgreSQL** with **Prisma ORM**
- Schema includes models for:
  - **Users**
  - **Accounts**
  - **Transactions**
  - **Budgets**
- Migration files are versioned and auto-generated for team sync


---

## 🧰 Tech Stack

| Tech             | Description                         |
|------------------|-------------------------------------|
| [Next.js](https://nextjs.org/) | React framework for frontend & SSR |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling    |
| [ShadCN UI](https://ui.shadcn.dev/) | Accessible, customizable UI components |
| [Lucide Icons](https://lucide.dev/) | Beautiful icon set |
| [Sonner](https://sonner.emilkowal.dev/) | Clean toast notifications |
| [Clerk](https://clerk.dev/) | User authentication & session management |
| [Prisma](https://www.prisma.io/) | ORM for PostgreSQL / MySQL / MongoDB |
| [Supabase](https://supabase.com/) |  Cloud SQL Database |
| [Recharts](https://recharts.org/) | Pie/bar charts for expense tracking |
| [Resend](https://resend.com/emails) | Email's send services for monthly and Budget report |
| [Arcjet](https://arcjet.com/) |  Security- Rate Limiting and Bot Protection |




---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/finintel.git
cd finintel

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# (Fill in values like DATABASE_URL, CLERK_SECRET_KEY, etc.)

# Generate Prisma client
npx prisma generate

# Run the development server
npm run dev
