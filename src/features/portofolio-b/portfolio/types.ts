export type ProjectCategory =
  | "Rumah Baru"
  | "Renovasi"
  | "Interior"
  | "Komersial";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  type: string;
  location: string;
  /** built area, e.g. "220 m²". */
  area: string;
  /** duration, e.g. "7 bulan". */
  status: string;
  year: number;
  imagePath: string;
  featured?: boolean;
}
