import { NextResponse } from "next/server";
import type { Course } from "@/lib/catalog";
import {
  APPLICATIONS_TABLE,
  type ApplicationInsert,
} from "@/lib/applications";
import { notifyNewApplication } from "@/lib/notify-application";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateApplicationBody } from "@/lib/validate-application";

type Body = {
  agency?: string;
  contact_name?: string;
  contact_phone?: string;
  participant_count?: number;
  education_target?: string;
  preferred_date?: string | null;
  date_flexible?: boolean;
  venue_type?: string;
  venue_other?: string;
  env_student_pc?: boolean;
  env_instructor_pc?: boolean;
  env_projector?: boolean;
  ai_level?: number;
  course_ids?: string[];
  courses?: Course[];
  auto_added_ids?: string[];
  total_hours?: number;
  application_reason?: string;
  learning_focus?: string;
  privacy_agreed?: boolean;
  company_website?: string;
  custom_curriculum?: boolean;
  custom_curriculum_request?: string;
};

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = checkRateLimit(`apply:${ip}`);
    if (!limited.ok) {
      return NextResponse.json(
        {
          error: `잠시 후 다시 시도해 주세요. (${limited.retryAfterSec}초)`,
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Body;

    const validation = validateApplicationBody(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status }
      );
    }

    const customCurriculum = Boolean(body.custom_curriculum);
    const courses = customCurriculum ? [] : body.courses ?? [];

    const row: ApplicationInsert = {
      agency: (body.agency ?? "").trim(),
      contact_name: (body.contact_name ?? "").trim(),
      contact_phone: (body.contact_phone ?? "").trim(),
      participant_count: body.participant_count ?? 1,
      education_target: (body.education_target ?? "").trim(),
      preferred_date: body.date_flexible ? null : body.preferred_date ?? null,
      date_flexible: Boolean(body.date_flexible),
      venue_type: (body.venue_type ?? "").trim(),
      venue_other: (body.venue_other ?? "").trim(),
      env_student_pc: Boolean(body.env_student_pc),
      env_instructor_pc: Boolean(body.env_instructor_pc),
      env_projector: Boolean(body.env_projector),
      ai_level: body.ai_level!,
      course_ids: customCurriculum ? [] : body.course_ids ?? courses.map((c) => c.id),
      courses,
      auto_added_ids: body.auto_added_ids ?? [],
      total_hours: customCurriculum ? 0 : body.total_hours ?? 0,
      application_reason: (body.application_reason ?? "").trim(),
      learning_focus: (body.learning_focus ?? "").trim(),
      custom_curriculum: customCurriculum,
      custom_curriculum_request: (body.custom_curriculum_request ?? "").trim(),
      status: "received",
      privacy_agreed_at: new Date().toISOString(),
    };

    const supabase = createAdminClient();

    const insertRow = async (payload: Record<string, unknown>) =>
      supabase
        .from(APPLICATIONS_TABLE)
        .insert(payload)
        .select("id, created_at")
        .single();

    let { data, error } = await insertRow(row);

    const missingEssayColumn =
      error?.code === "PGRST204" &&
      (error.message.includes("application_reason") ||
        error.message.includes("learning_focus"));

    if (missingEssayColumn) {
      const { application_reason: _r, learning_focus: _f, ...withoutEssay } =
        row;
      const retry = await insertRow(withoutEssay);
      data = retry.data;
      error = retry.error;

      if (!error && data) {
        return NextResponse.json({
          id: data.id,
          created_at: data.created_at,
          essay_warning:
            "신청은 접수되었으나, 주관식(신청사유·중점 학습) 칸이 DB에 없어 해당 내용은 저장되지 않았습니다. Supabase SQL Editor에서 scripts/supabase-add-essay-columns.sql 을 실행해 주세요.",
        });
      }
    }

    const missingStatusColumn =
      error?.code === "PGRST204" &&
      (error.message.includes("status") ||
        error.message.includes("privacy_agreed"));

    if (missingStatusColumn) {
      const {
        status: _s,
        privacy_agreed_at: _p,
        ...withoutStatus
      } = row;
      const retry = await insertRow(withoutStatus);
      data = retry.data;
      error = retry.error;
    }

    const missingCustomColumn =
      error?.code === "PGRST204" &&
      (error.message.includes("custom_curriculum"));

    if (missingCustomColumn) {
      const {
        custom_curriculum: _c,
        custom_curriculum_request: _r,
        ...withoutCustom
      } = row;
      const retry = await insertRow(withoutCustom);
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error("[applications] insert failed:", error.code, error.message);
      let hint = "Supabase applications 표와 .env.local 키를 확인해 주세요.";
      if (error.code === "PGRST125") {
        hint =
          ".env.local의 SUPABASE URL에서 /rest/v1 을 제거하고 https://프로젝트ID.supabase.co 만 넣어 주세요.";
      } else if (error.code === "PGRST204") {
        hint =
          "applications 표 칸이 맞지 않습니다. scripts/supabase-setup.sql 및 supabase-add-status-privacy.sql 을 실행해 주세요.";
      }
      return NextResponse.json(
        { error: `저장에 실패했습니다. ${hint}` },
        { status: 500 }
      );
    }

    const id = data!.id;
    const created_at = data!.created_at;

    notifyNewApplication({ ...row, id, created_at }).catch((err) =>
      console.error("[applications] notify error:", err)
    );

    return NextResponse.json({ id, created_at });
  } catch (err) {
    console.error("[applications] unexpected error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
