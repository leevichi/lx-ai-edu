import type { Course } from "./catalog";

const PHONE_RE = /^[\d\s\-+()]{9,20}$/;

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15 && PHONE_RE.test(phone.trim());
}

export function validateApplicationBody(body: {
  agency?: string;
  contact_name?: string;
  contact_phone?: string;
  ai_level?: number;
  courses?: Course[];
  privacy_agreed?: boolean;
  company_website?: string;
  custom_curriculum?: boolean;
  custom_curriculum_request?: string;
}): { ok: true } | { ok: false; error: string; status: number } {
  if (body.company_website?.trim()) {
    return { ok: false, error: "요청을 처리할 수 없습니다.", status: 400 };
  }

  if (!body.privacy_agreed) {
    return {
      ok: false,
      error: "개인정보 수집·이용에 동의해 주세요.",
      status: 400,
    };
  }

  if (typeof body.ai_level !== "number" || body.ai_level < 1 || body.ai_level > 7) {
    return { ok: false, error: "AI 숙련도를 확인해 주세요.", status: 400 };
  }

  const customCurriculum = Boolean(body.custom_curriculum);

  if (customCurriculum) {
    if (!(body.custom_curriculum_request ?? "").trim()) {
      return {
        ok: false,
        error: "별도 조율 희망 내용을 입력해 주세요.",
        status: 400,
      };
    }
  } else if (!Array.isArray(body.courses) || body.courses.length === 0) {
    return { ok: false, error: "선택한 과목이 없습니다.", status: 400 };
  }

  const agency = (body.agency ?? "").trim();
  const contactName = (body.contact_name ?? "").trim();
  const contactPhone = (body.contact_phone ?? "").trim();

  if (!agency || !contactName || !contactPhone) {
    return {
      ok: false,
      error: "기관명, 담당자, 연락처를 모두 입력해 주세요.",
      status: 400,
    };
  }

  if (!isValidPhone(contactPhone)) {
    return {
      ok: false,
      error: "연락처 형식을 확인해 주세요. (예: 010-1234-5678)",
      status: 400,
    };
  }

  return { ok: true };
}
