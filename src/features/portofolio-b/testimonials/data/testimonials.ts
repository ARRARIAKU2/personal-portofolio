export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  project: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Yang membuat saya tenang, RAB-nya benar-benar terbuka. Tidak ada kejutan biaya di tengah jalan, dan hasil akhirnya persis seperti 3D yang dijanjikan.",
    name: "Prawira Adiwangsa",
    role: "Pemilik Rumah Prawira",
    project: "Renovasi · Bintaro",
    initials: "PA",
  },
  {
    id: "t2",
    quote:
      "Satu tim untuk desain dan bangun ternyata bikin prosesnya jauh lebih mulus. Site manager-nya rajin kirim foto tiap dua minggu tanpa diminta.",
    name: "Larasati Wijoyo",
    role: "Pemilik Vila Candrakirana",
    project: "Rumah Baru · Ubud",
    initials: "LW",
  },
  {
    id: "t3",
    quote:
      "Detail interiornya rapi sampai ke sambungan kayu. ARK paham betul cara menerjemahkan selera kami tanpa kehilangan fungsinya.",
    name: "Bimasena Hartono",
    role: "Pemilik Loft Senjaya",
    project: "Interior · Surabaya",
    initials: "BH",
  },
  {
    id: "t4",
    quote:
      "Kedai kami selesai tepat sebelum grand opening. Timeline yang mereka janjikan di awal benar-benar ditepati, itu langka.",
    name: "Ayunda Kusuma",
    role: "Pendiri Kalyca Coffee House",
    project: "Komersial · Menteng",
    initials: "AK",
  },
];
