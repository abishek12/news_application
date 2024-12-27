"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "News App",
//   description: "Created by Tuna Technology",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAccountPage = pathname.startsWith("/account");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrapper div to handle layout */}
        <div className="flex flex-col min-h-screen ">
          {/* Header and Navbar */}

          <main>
            {!isAccountPage && <Header />}
            {/* <Header /> */}
          </main>
          <main>
            {!isAccountPage && <Navbar />}

            {/* <Navbar />  */}
          </main>
          {/* Main content (fills available space) */}
          <main className="flex-grow">{children}</main>
          {/* Footer at the bottom */}
          {!isAccountPage && <Footer />}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
