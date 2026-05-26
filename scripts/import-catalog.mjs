import XLSX from "xlsx";
import fs from "fs";

const path =
  process.argv[2] ||
  "C:/Users/tjsql_j94i0qk/Downloads/LX_교육과정_7영역_템플릿_v2_채움.xlsx";
const wb = XLSX.readFile(path);

const domains = XLSX.utils.sheet_to_json(wb.Sheets["Domains"]).map((d) => ({
  id: d.domain_id,
  name: d.domain_name,
  order: Number(d.domain_order),
  description: String(d.description || ""),
  levelMin: Number(d.default_level_min),
  levelMax: Number(d.default_level_max),
  linkedGoalIds: String(d.linked_goal_ids || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
}));

const courses = XLSX.utils
  .sheet_to_json(wb.Sheets["Courses"])
  .filter((c) => c.course_name && c.is_active !== false)
  .map((c) => ({
    id: c.course_id,
    domainId: c.domain_id,
    domainName: c.domain_name,
    order: Number(c.course_order),
    title: c.course_name,
    levelMin: Number(c.level_min),
    levelMax: Number(c.level_max),
    durationHours: Number(c.duration_hours) || 0,
    format: String(c.format || "혼합"),
    practiceRatio: Number(c.practice_ratio) || 0,
    tags: String(c.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    outcomes: String(c.learning_outcomes || ""),
    prerequisiteIds: String(c.prerequisite_ids || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    excludeWithIds: String(c.exclude_with_ids || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    isCore:
      c.is_core_in_domain === true ||
      c.is_core_in_domain === "TRUE" ||
      c.is_core_in_domain === "true",
  }));

const content = `// Auto-generated from LX_교육과정_7영역_템플릿_v2_채움.xlsx
export interface Domain {
  id: string;
  name: string;
  order: number;
  description: string;
  levelMin: number;
  levelMax: number;
  linkedGoalIds: string[];
}

export interface Course {
  id: string;
  domainId: string;
  domainName: string;
  order: number;
  title: string;
  levelMin: number;
  levelMax: number;
  durationHours: number;
  format: string;
  practiceRatio: number;
  tags: string[];
  outcomes: string;
  prerequisiteIds: string[];
  excludeWithIds: string[];
  isCore: boolean;
}

export const DOMAINS: Domain[] = ${JSON.stringify(domains, null, 2)};

export const COURSES: Course[] = ${JSON.stringify(courses, null, 2)};

export const COURSE_MAP = new Map(COURSES.map((c) => [c.id, c]));

export function getCoursesByDomain(domainId: string): Course[] {
  return COURSES.filter((c) => c.domainId === domainId).sort(
    (a, b) => a.order - b.order
  );
}
`;

fs.writeFileSync("lib/catalog.ts", content, "utf8");
console.log(`Imported ${domains.length} domains, ${courses.length} courses`);
