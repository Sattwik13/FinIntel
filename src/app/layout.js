import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";

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
          
          <main>{children}</main> 

          {/* Footer */}
          {/* <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with 💓 by Sattwik</p>
            </div>
          </footer> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
