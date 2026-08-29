import type { IconType } from "react-icons";

export interface Service {
  id: string;
  index: string;
  title: string;
  desc: string;
  points: string[];
  icon: IconType;
}
