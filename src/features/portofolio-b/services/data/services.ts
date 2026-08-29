import {
  TbHome,
  TbTools,
  TbRulerMeasure,
  TbSofa,
  TbClipboardText,
} from "react-icons/tb";
import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "konstruksi",
    index: "01",
    title: "Konstruksi Rumah",
    desc: "Membangun hunian baru dari nol dengan struktur yang kuat dan detail rapi, mengikuti gambar kerja dan RAB yang disepakati.",
    points: ["Pondasi & struktur", "Arsitektur & MEP", "Finishing presisi"],
    icon: TbHome,
  },
  {
    id: "renovasi",
    index: "02",
    title: "Renovasi",
    desc: "Menata ulang rumah lama — memperkuat, memperluas, atau menyegarkan tampilan tanpa membongkar yang masih baik.",
    points: ["Audit kondisi", "Perkuatan struktur", "Perluasan ruang"],
    icon: TbTools,
  },
  {
    id: "arsitektur",
    index: "03",
    title: "Desain Arsitektur Modern Minimalis",
    desc: "Merancang massa, fasad, dan tata ruang yang tenang, fungsional, dan sesuai iklim tropis serta kebiasaan penghuni.",
    points: ["Konsep & massa", "Gambar kerja", "Maket & 3D"],
    icon: TbRulerMeasure,
  },
  {
    id: "interior",
    index: "04",
    title: "Interior & Fit-out",
    desc: "Menghadirkan interior menyeluruh — furnitur custom, pencahayaan, dan material — yang selaras dengan arsitekturnya.",
    points: ["Furnitur custom", "Skema material", "Tata cahaya"],
    icon: TbSofa,
  },
  {
    id: "konsultasi",
    index: "05",
    title: "Konsultasi & Perencanaan",
    desc: "Mendampingi sejak sebelum membangun: kelayakan lahan, estimasi anggaran, dan perencanaan tahapan yang realistis.",
    points: ["Studi kelayakan", "Estimasi biaya", "Perencanaan tahap"],
    icon: TbClipboardText,
  },
];
