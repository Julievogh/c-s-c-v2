"use client";

import "./globals.css";
import { Lora, Karla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const lora = Lora({ subsets: ["latin"], variable: "--font-subtitle" });
const karla = Karla({ subsets: ["latin"], variable: "--font-body" });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en" className={`${lora.variable} ${karla.variable}`}>
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
