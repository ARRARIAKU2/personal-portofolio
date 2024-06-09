import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://localhost:3000/'),

  title: 'M. Alana',

  authors: {
    name: 'M. Alana',
  },

  description:
    "Based in Indonesia, I'm a Fullstack developer passionate about building a modern web application that users love.",
  openGraph: {
    title: 'M. Alana',
    description:
      "Based in Indonesia, I'm a Fullstack developer passionate about building a modern web application that users love.",
    url: 'https://localhost:3000/',
    siteName: 'M. Alana',
    images: '/og.png',
    type: 'website',
  },
  keywords: ['daily web coding', 'chensokheng', 'dailywebcoding'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
