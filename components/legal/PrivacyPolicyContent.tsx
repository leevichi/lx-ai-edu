import { SITE } from "@/lib/site-config";

export function PrivacyPolicyContent() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold">
      <p className="text-sm text-slate-600">시행일: 2025년 5월 26일</p>
      <h2 className="text-xl text-slate-900">1. 수집하는 개인정보 항목</h2>
      <p className="text-slate-700 leading-relaxed">
        {SITE.platformName}은 교육 신청 접수를 위해 다음 정보를 수집합니다.
      </p>
      <ul className="list-disc pl-5 text-slate-700 space-y-1">
        <li>필수: 신청기관명, 담당자명, 연락처, 수강인원, 교육 희망 일정·장소, AI 숙련도, 선택 과목, 신청사유, 중점 학습 항목</li>
        <li>선택: 교육대상, 교육환경(PC·빔프로젝터 등)</li>
      </ul>

      <h2 className="text-xl text-slate-900 mt-8">2. 이용 목적</h2>
      <ul className="list-disc pl-5 text-slate-700 space-y-1">
        <li>맞춤형 AI 교육 과정 상담 및 일정·과목 확정</li>
        <li>신청 내역 관리 및 운영 담당자 연락</li>
        <li>서비스 품질 개선(통계·익명화된 분석)</li>
      </ul>

      <h2 className="text-xl text-slate-900 mt-8">3. 보관 기간</h2>
      <p className="text-slate-700 leading-relaxed">
        신청 완료일로부터 교육 종료 및 정산 완료 후 <strong>3년</strong>까지 보관하며, 관련
        법령에 따라 더 긴 기간이 필요한 경우 해당 기간을 따릅니다.
      </p>

      <h2 className="text-xl text-slate-900 mt-8">4. 제3자 제공</h2>
      <p className="text-slate-700 leading-relaxed">
        원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만 법령에 따른
        요청이 있는 경우 예외로 합니다.
      </p>

      <h2 className="text-xl text-slate-900 mt-8">5. 처리 위탁</h2>
      <p className="text-slate-700 leading-relaxed">
        신청 데이터 저장·호스팅을 위해 클라우드 DB(Supabase)를 사용할 수 있으며, 위탁 시
        계약을 통해 안전하게 관리합니다.
      </p>

      <h2 className="text-xl text-slate-900 mt-8">6. 이용자 권리</h2>
      <p className="text-slate-700 leading-relaxed">
        열람·정정·삭제·처리정지를 요청하실 수 있습니다. 문의:{" "}
        <a href={`mailto:${SITE.contactEmail}`} className="text-[#009881] font-medium">
          {SITE.contactEmail}
        </a>
        ,{" "}
        <a href={`tel:${SITE.contactPhone.replace(/-/g, "")}`} className="text-[#009881] font-medium">
          {SITE.contactPhone}
        </a>
      </p>
    </div>
  );
}
