import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://alana0707.vercel.app";
const TITLE = "M. Alana";
const DESCRIPTION =
  "A passionate Frontend Developer based in Indonesia with 2 years of experience building modern, responsive web apps with React and Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | M. Alana",
  },
  applicationName: "M. Alana Portfolio",
  authors: { name: "M. Alana", url: "https://www.linkedin.com/in/m-alana/" },
  creator: "M. Alana",
  publisher: "M. Alana",
  description: DESCRIPTION,
  keywords: [
    "M. Alana",
    "M. Alana Universitas Sriwijaya",
    "M. Alana Sriwijaya",
    "M. Alana Palembang",
    "Muhammad Alana",
    "Muhammad Alana Universitas Sriwijaya",
    "Muhammad Alana Palembang",
    "Muhammad Alana Sriwijaya",
    "M Alana",
    "M Alana Universitas Sriwijaya",
    "M Alana Palembang",
    "M Alana Sriwijaya",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "M. Alana",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "M. Alana — Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
