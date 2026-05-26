const STORAGE_KEY = "lx-apply-form-v2";

export type VenueType = "internal" | "external" | "other";

export type ApplyFormData = {
  agency: string;
  contactName: string;
  contactPhone: string;
  participantCount: number;
  educationTarget: string;
  preferredDate: string | null;
  dateFlexible: boolean;
  venue: VenueType | "";
  venueOther: string;
  hasStudentPc: boolean;
  hasInstructorPc: boolean;
  hasProjector: boolean;
  applicationReason: string;
  learningFocus: string;
  privacyAgreed: boolean;
};

export function saveApplyForm(data: ApplyFormData): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadApplyForm(): ApplyFormData | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ApplyFormData>;
    return {
      agency: parsed.agency ?? "",
      contactName: parsed.contactName ?? "",
      contactPhone: parsed.contactPhone ?? "",
      participantCount: parsed.participantCount ?? 0,
      educationTarget: parsed.educationTarget ?? "",
      preferredDate: parsed.preferredDate ?? null,
      dateFlexible: parsed.dateFlexible ?? false,
      venue: parsed.venue ?? "",
      venueOther: parsed.venueOther ?? "",
      hasStudentPc: parsed.hasStudentPc ?? false,
      hasInstructorPc: parsed.hasInstructorPc ?? false,
      hasProjector: parsed.hasProjector ?? false,
      applicationReason: parsed.applicationReason ?? "",
      learningFocus: parsed.learningFocus ?? "",
      privacyAgreed: parsed.privacyAgreed ?? false,
    };
  } catch {
    return null;
  }
}

export function clearApplyForm(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function venueLabel(data: ApplyFormData): string {
  if (data.venue === "internal") return "내부강의실";
  if (data.venue === "external") return "외부강의실";
  if (data.venue === "other") return data.venueOther.trim() || "기타";
  return "";
}

export function isApplyFormComplete(data: ApplyFormData | null): data is ApplyFormData {
  if (!data) return false;
  if (!data.agency.trim()) return false;
  if (!data.contactName.trim()) return false;
  if (!data.contactPhone.trim()) return false;
  if (!data.participantCount || data.participantCount < 1) return false;
  if (!data.applicationReason.trim()) return false;
  if (!data.learningFocus.trim()) return false;
  if (!data.dateFlexible && !data.preferredDate) return false;
  if (!data.venue) return false;
  if (data.venue === "other" && !data.venueOther.trim()) return false;
  if (!data.privacyAgreed) return false;
  return true;
}
