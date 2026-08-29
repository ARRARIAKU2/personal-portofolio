import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://localhost:3000/"),

  title: "M. Alana",

  authors: {
    name: "M. Alana",
  },

  description:
    "a Passionate and enthusiastic Frontend Developer with 2 years of experience.",
  openGraph: {
    title: "M. Alana",
    description:
      "a Passionate and enthusiastic Frontend Developer with 2 years of experience.",
    url: "https://localhost:3000/",
    siteName: "M. Alana",
    images: "/profile.jpg",
    type: "website",
  },
  keywords: ["M. Alana", "Frontend Developer", "React", "Next.js", "Portfolio"],
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
