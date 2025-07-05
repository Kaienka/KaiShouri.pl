import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kai Shouri",
  description: "Kai Shouri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <div className="grid grid-cols-[250px_1fr] h-full w-full">
          <div className="h-full w-full">
            <Navigation />
          </div>
          <main className="h-full w-full overflow-auto bg-linen-cloud">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
