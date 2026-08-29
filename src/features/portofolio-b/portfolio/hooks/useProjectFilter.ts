"use client";
import { useMemo, useState } from "react";
import { projects, projectCategories } from "../data/projects";
import type { Project, ProjectCategory } from "../types";

type Filter = "Semua" | ProjectCategory;

export function useProjectFilter() {
  const [active, setActive] = useState<Filter>("Semua");

  const filtered = useMemo<Project[]>(
    () =>
      active === "Semua"
        ? projects
        : projects.filter((p) => p.category === active),
    [active]
  );

  return { active, setActive, filtered, categories: projectCategories };
}
