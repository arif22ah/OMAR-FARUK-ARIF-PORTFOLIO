export type SkillCategory = "all" | "core" | "ml" | "mlops";
export type ProjectCategory = "all" | "genai" | "mlops" | "causal";

export interface Award {
  id: string;
  rank: string;
  course: string;
  institution: string;
}

export interface Skill {
  name: string;
  category: Exclude<SkillCategory, "all">;
  badge: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  number: string;
  category: Exclude<ProjectCategory, "all">;
  title: string;
  badge: string;
  problem: string;
  solution: string;
  highlights: string[];
  workflow: string[];
  stack: string[];
  metrics: ProjectMetric[];
}
