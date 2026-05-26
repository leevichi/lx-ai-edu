import Link from "next/link";
import { HomeHeader } from "@/components/home/HomeHeader";
import { SITE } from "@/lib/site-config";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function TermsPage() {
  return (
    <>
      <HomeHeader />
      <main className="bg-white">
        <div className="section-inner max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-[#009881] hover:underline">
            ← 홈
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">서비스 이용안내</h1>
          <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900">서비스 개요</h2>
              <p className="mt-2">
                본 사이트는 {SITE.orgName}의 AI 교육 과정을 <strong>희망 신청</strong>하기 위한
                플랫폼입니다. 제출 내용은 최종 확정이 아니며, 담당자 협의 후 일정·과목이
                확정됩니다.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900">신청 절차</h2>
              <ol className="mt-2 list-decimal pl-5 space-y-1">
                <li>기관·담당자 정보 입력 (STEP 1)</li>
                <li>AI 숙련도 및 희망 과목 선택 (STEP 2)</li>
                <li>최종 확인 후 접수</li>
                <li>담당자 유선 연락 ({SITE.responseDays} 내 1차 협의)</li>
              </ol>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900">문의</h2>
              <p className="mt-2">
                전화:{" "}
                <a href={`tel:${SITE.contactPhone.replace(/-/g, "")}`} className="text-[#009881] font-semibold">
                  {SITE.contactPhone}
                </a>
                <br />
                이메일:{" "}
                <a href={`mailto:${SITE.contactEmail}`} className="text-[#009881] font-semibold">
                  {SITE.contactEmail}
                </a>
                <br />
                운영 시간: {SITE.contactHours}
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
