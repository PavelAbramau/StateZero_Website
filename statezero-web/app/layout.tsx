import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../src/components/ui/Header";
import ClientBackgrounds from "../src/components/ClientBackgrounds";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StateZero Labs",
  description:
    "Computational latent-space transcriptomics for reprogramming fibrotic tissue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05050A]">
        {/* Gene network — fixed behind every page */}
        <ClientBackgrounds />
        <Header />
        <div className="relative z-10 flex flex-col flex-1 pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}
