import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "@/components/read/ThemeChanger";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kai Shouri",
  description:
    "Kai Shouri - strona domowa. Piję kawę i piszę fiki. Czasami w odwrotnej kolejności",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
        >
          <div className="flex h-screen w-full">
            <Navigation />
            <main className="flex-1 overflow-auto mt-16 sm:mt-0">
              <section className="sm:flex flex-row justify-end hidden">
              <ThemeChanger  />
              </section>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
