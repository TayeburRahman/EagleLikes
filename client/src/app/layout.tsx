import type { Metadata } from "next";
import { Inter, Open_Sans, Rethink_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Eagle Likes - Buy Instagram Followers with Fast Delivery",
  description:
    "Quickly get premium Instagram followers safely and easily! Boost your IG influence and engagement instantly! Always great prices and offers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${openSans.variable} ${rethinkSans.variable} antialiased font-sans`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
