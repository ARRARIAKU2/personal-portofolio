/** Section anchors shared by Navbar, MobileMenu and Footer. */
export const NAV_LINKS = [
  { id: "tentang", label: "Tentang" },
  { id: "layanan", label: "Layanan" },
  { id: "portofolio", label: "Portofolio" },
  { id: "proses", label: "Proses" },
  { id: "faq", label: "FAQ" },
] as const;

export const BRAND = {
  name: "ARK Design",
  tagline: "Arsitektur & Konstruksi",
  phoneDisplay: "+62 812-9047-3318",
  phoneHref: "tel:+6281290473318",
  email: "studio@arkdesign.id",
  whatsapp: "https://wa.me/6281290473318",
  address: "Jl. Cikini Raya No. 24, Jakarta Pusat 10330",
  instagram: "https://instagram.com/arkdesign.id",
  established: 2013,
} as const;
