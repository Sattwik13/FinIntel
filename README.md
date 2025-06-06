# 💸 FinIntel — AI-Powered Finance Management Platform

FinIntel is an AI-driven personal and business finance management platform that helps users track spending, set budgets, and gain intelligent insights for smarter financial decisions. Built with Next.js, Tailwind CSS, and OpenAI-powered analytics.

---

## 🚀 Features

- 🔐 User Authentication with Clerk
- 📊 AI-powered financial insights
- 💰 Monthly budget tracking
- 📉 Expense categorization and charts
- 📥 Add/view/delete transactions
- 🧠 Smart alerts and cost-saving suggestions
- 📱 Responsive dark mode UI
- 🗂️ Secure data handling via Next.js API routes

---

## 🧰 Tech Stack

| Tech             | Description                         |
|------------------|-------------------------------------|
| [Next.js](https://nextjs.org/) | React framework for frontend & SSR |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling           |
| [Clerk](https://clerk.dev/) | User authentication & session management |
| [Prisma](https://www.prisma.io/) | ORM for PostgreSQL / MySQL / MongoDB |
| [Vercel](https://vercel.com/) | Deployment & hosting |
| [ShadCN UI](https://ui.shadcn.dev/) | Accessible, customizable UI components |
| [Lucide Icons](https://lucide.dev/) | Beautiful icon set |
| [Sonner](https://sonner.emilkowal.dev/) | Clean toast notifications |
| [Chart.js](https://www.chartjs.org/) | Pie/bar charts for expense tracking |

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
