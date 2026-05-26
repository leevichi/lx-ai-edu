import type { Course } from "@/lib/catalog";
import type { ApplicationStatus } from "./site-config";

export type ApplicationRow = {
  id: string;
  agency: string;
  contact_name: string;
  contact_phone: string;
  participant_count: number;
  education_target: string;
  preferred_date: string | null;
  date_flexible: boolean;
  venue_type: string;
  venue_other: string;
  env_student_pc: boolean;
  env_instructor_pc: boolean;
  env_projector: boolean;
  ai_level: number;
  course_ids: string[];
  courses: Course[];
  auto_added_ids: string[];
  total_hours: number;
  application_reason: string;
  learning_focus: string;
  custom_curriculum?: boolean;
  custom_curriculum_request?: string;
  status?: ApplicationStatus;
  privacy_agreed_at?: string | null;
  created_at: string;
};

export type ApplicationInsert = {
  agency: string;
  contact_name: string;
  contact_phone: string;
  participant_count: number;
  education_target: string;
  preferred_date: string | null;
  date_flexible: boolean;
  venue_type: string;
  venue_other: string;
  env_student_pc: boolean;
  env_instructor_pc: boolean;
  env_projector: boolean;
  ai_level: number;
  course_ids: string[];
  courses: Course[];
  auto_added_ids: string[];
  total_hours: number;
  application_reason: string;
  learning_focus: string;
  custom_curriculum?: boolean;
  custom_curriculum_request?: string;
  status?: ApplicationStatus;
  privacy_agreed_at?: string;
};

export const APPLICATIONS_TABLE = "applications";
