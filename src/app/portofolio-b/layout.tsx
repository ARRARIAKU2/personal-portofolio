import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const BRAND = "ARK Design";
const TITLE = `${BRAND} — Arsitektur & Konstruksi Modern Minimalis`;
const DESCRIPTION =
  "ARK Design merancang dan membangun rumah, renovasi, dan interior modern minimalis. Konsultasi, desain arsitektur, RAB, hingga serah terima dalam satu tim yang terukur.";
const PATH = "/portofolio-b";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: BRAND,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "jasa konstruksi",
    "arsitek modern minimalis",
    "desain rumah",
    "renovasi rumah",
    "kontraktor",
    "interior fit-out",
    "RAB konstruksi",
    "ARK Design",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: BRAND,
    locale: "id_ID",
    images: [
      {
        url: "/portofolio-b/og.jpg",
        width: 1200,
        height: 630,
        alt: "ARK Design — arsitektur & konstruksi modern minimalis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/portofolio-b/og.jpg"],
  },
};

/** Organization / LocalBusiness structured data for rich results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: BRAND,
  description: DESCRIPTION,
  areaServed: "Indonesia",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Cikini Raya No. 24",
    addressLocality: "Jakarta Pusat",
    addressRegion: "DKI Jakarta",
    postalCode: "10330",
    addressCountry: "ID",
  },
  telephone: "+62-812-9047-3318",
  email: "studio@arkdesign.id",
  priceRange: "$$$",
};

export default function PortofolioBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`ark ${outfit.variable} ${spaceGrotesk.variable} min-h-[100dvh] antialiased`}
      style={{
        fontFamily: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
