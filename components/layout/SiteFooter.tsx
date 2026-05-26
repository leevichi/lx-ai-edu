import Link from "next/link";
import { SITE } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">{SITE.platformName}</p>
            <p className="mt-1 text-sm text-slate-600">
              기관·지역 맞춤형 AI 교육 과정을 설계하고 신청할 수 있습니다.
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <p>
              문의:{" "}
              <a
                href={`tel:${SITE.contactPhone.replace(/-/g, "")}`}
                className="font-semibold text-[#009881]"
              >
                {SITE.contactPhone}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${SITE.contactEmail}`} className="text-[#009881] hover:underline">
                {SITE.contactEmail}
              </a>
            </p>
            <p className="mt-1 text-slate-500">{SITE.contactHours}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            홈
          </Link>
          <Link href="/apply/info" className="hover:text-slate-900 transition-colors">
            교육 신청
          </Link>
          <Link href="/apply/lookup" className="hover:text-slate-900 transition-colors">
            신청 조회
          </Link>
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-slate-900 transition-colors">
            서비스 이용안내
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-400">© {SITE.orgName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
