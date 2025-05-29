import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"]})

export const metadata = {
  title: "FinIntel",
  description: "Ai Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          {/* header */}
          <Header />
          
          <main className="min-h-screen">{children}</main> 
          <Toaster richColors/>
          {/* Footer */}
          <footer className="bg-teal-50 py-10">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>© 2025 Sattwik Manna. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
