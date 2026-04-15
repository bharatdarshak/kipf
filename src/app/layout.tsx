import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "../styles/index.css";
import "../styles/motion.css";

import TopBar from "../components/layout/TopBar";
import BottomNav from "../components/layout/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "12th Kolkata International Poultry Fair | India's Biggest Poultry Mela",
  description: "Join the 12th Kolkata International Poultry Fair, India's biggest platform for poultry industry professionals, exhibitors, and sponsors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <TopBar />
        <main>{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
