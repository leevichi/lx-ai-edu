import { SITE } from "@/lib/site-config";

export function ContactNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-[#009881]/20 bg-[#e6f7f4]/60 ${compact ? "p-4" : "p-5"}`}
    >
      <p className="text-sm font-semibold text-[#007a66]">LX 교육 운영 문의</p>
      <p className={`mt-2 text-slate-700 ${compact ? "text-sm" : "text-base"} leading-relaxed`}>
        전화{" "}
        <a
          href={`tel:${SITE.contactPhone.replace(/-/g, "")}`}
          className="font-bold text-slate-900 hover:text-[#009881]"
        >
          {SITE.contactPhone}
        </a>
        {" · "}
        이메일{" "}
        <a href={`mailto:${SITE.contactEmail}`} className="font-bold text-[#009881] hover:underline">
          {SITE.contactEmail}
        </a>
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {SITE.contactHours} · 접수 후 {SITE.responseDays} 내 1차 연락
      </p>
    </div>
  );
}
