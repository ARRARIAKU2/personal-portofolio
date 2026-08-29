export interface ProcessStep {
  no: string;
  title: string;
  desc: string;
  deliverable: string;
}

export const processSteps: ProcessStep[] = [
  {
    no: "01",
    title: "Brief & Konsultasi",
    desc: "Kami mendengar kebutuhan, kebiasaan, dan anggaran Anda, lalu meninjau lahan atau bangunan yang ada.",
    deliverable: "Ringkasan kebutuhan & estimasi awal",
  },
  {
    no: "02",
    title: "Konsep Desain",
    desc: "Tata ruang, massa, dan karakter fasad kami tuangkan dalam gambar dan visual tiga dimensi untuk disepakati bersama.",
    deliverable: "Denah, 3D, & skema material",
  },
  {
    no: "03",
    title: "RAB & Timeline",
    desc: "Rincian anggaran biaya yang terbuka dan jadwal kerja yang realistis disusun sebelum satu batu pun dipasang.",
    deliverable: "RAB terinci & kurva-S",
  },
  {
    no: "04",
    title: "Eksekusi Konstruksi",
    desc: "Tim lapangan membangun sesuai gambar kerja, dengan site manager tetap dan laporan progres berkala.",
    deliverable: "Laporan foto & progres 2 mingguan",
  },
  {
    no: "05",
    title: "QC & Serah Terima",
    desc: "Pemeriksaan mutu menyeluruh, perbaikan daftar cacat, lalu kunci berpindah tangan dengan garansi tertulis.",
    deliverable: "Berita acara & garansi",
  },
];
