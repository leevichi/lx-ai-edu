import { SITE } from "@/lib/site-config";

const FAQ_ITEMS = [
  {
    q: "신청 후 최종 교육 확정까지 얼마나 걸리나요?",
    a: "신청 접수 후 운영 담당자가 연락드려 일정·과목·장소를 조율합니다. 일반적으로 영업일 기준 2~5일 내 1차 협의가 진행됩니다.",
  },
  {
    q: "희망 날짜가 불가능하면 어떻게 되나요?",
    a: "대체 가능한 일정 후보를 제안드리며, 날짜 상관없음을 선택하면 빠른 편성 가능한 일정으로 우선 안내해드립니다.",
  },
  {
    q: "장소가 아직 미정이어도 신청할 수 있나요?",
    a: "네, 가능합니다. 장소 유형(내부/외부/기타)만 선택해 제출하시면 협의 단계에서 최종 확정할 수 있습니다.",
  },
  {
    q: "수강 대상에 따라 과목 난이도를 조정할 수 있나요?",
    a: "가능합니다. AI 숙련도와 교육대상 정보를 바탕으로 기초 중심 또는 실습 중심으로 커리큘럼을 조정합니다.",
  },
  {
    q: "제출 후에도 신청 내용을 수정할 수 있나요?",
    a: `담당자와 최초 협의 전이라면 수정 요청이 가능합니다. ${SITE.contactPhone} 또는 ${SITE.contactEmail} 로 연락해 주세요.`,
  },
  {
    q: "신청 정보가 다른 기기에서도 이어지나요?",
    a: "STEP 1 정보는 같은 브라우저에만 임시 저장됩니다. 창을 닫으면 STEP 1부터 다시 입력해 주세요.",
  },
  {
    q: "교육환경(PC, 빔프로젝터) 준비가 안 되어도 진행할 수 있나요?",
    a: "가능한 범위에서 운영 방식(시연 중심, 장비 대체안)으로 조정할 수 있어 신청 시 현재 상황을 그대로 체크해주시면 됩니다.",
  },
];

export function HomeFaqSection() {
  return (
    <section id="faq" className="section-band section-band--lavender">
      <div className="section-inner">
        <p className="section-label">자주 묻는 질문</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          신청 전에 많이 물어보시는 내용
        </h2>
        <div className="mt-8 grid gap-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group trend-card p-5">
              <summary className="cursor-pointer list-none pr-6 text-base font-semibold text-slate-900 marker:hidden">
                {item.q}
                <span className="float-right font-normal text-[#009881] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
