'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from 'next/navigation';
//import SuccessNotification from "./components/notifications/SuccessNotification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login/login' || pathname === '/admin/login';
  const isSignupPage = pathname === '/login/signup';
  const hideHeaderAndFooter = isLoginPage || isSignupPage;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {!hideHeaderAndFooter && <Header />}
        {!hideHeaderAndFooter }
        <main className="flex-grow">
        {children}
        </main>
        {!hideHeaderAndFooter && <Footer />}
      </body>
    </html>
  );
}
