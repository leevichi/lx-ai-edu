"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, GraduationCap, Sparkles, Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HeroPhotoCarousel } from "@/components/home/HeroPhotoCarousel";
import { HeroTitleBanner } from "@/components/home/HeroTitleBanner";
import { HomeDomainGrid } from "@/components/home/HomeDomainGrid";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { SiteFooter } from "@/components/layout/SiteFooter";

const HERO_COPY = [
  {
    lead: "빠르게 변화하는 AI 시대,",
    body: "기술을 이해하는 것을 넘어 실제로 활용하는 역량이 중요해지고 있습니다.",
  },
  {
    lead: "생성형 AI와 데이터 기반 기술은",
    body: "행정·교육·산업 현장의 업무 방식을 변화시키고 있으며, 지역과 기관의 새로운 성장 기회를 만들어가고 있습니다.",
  },
  {
    lead: "실무 중심 AI 교육으로",
    body: "업무 효율과 디지털 활용 역량을 높이고, 현장에 바로 적용 가능한 AI 경험을 시작해보세요.",
  },
];

const VALUE_ITEMS = [
  {
    title: "지역·기관 맞춤 교육",
    body: "평생교육, 산학협력, 공공기관 실무 등 대상에 맞는 LX 교육을 설계합니다.",
    icon: Workflow,
  },
  {
    title: "7개 AI 교육 영역",
    body: "기초부터 문서·이미지·영상·데이터·지역주민 교육까지 필요한 분야만 골라 구성합니다.",
    icon: CheckCircle2,
  },
  {
    title: "신청 후 담당자 협의",
    body: "희망 과목 접수 후 LX 교육 담당자가 연락드려 일정·과목·인원을 확정합니다.",
    icon: GraduationCap,
  },
];

export default function Home() {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState(false);

  const goApply = () => {
    setIsRouting(true);
    setTimeout(() => router.push("/apply/info"), 280);
  };

  return (
    <>
      <HomeHeader />

      <main className="bg-white text-slate-900">
        <section className="home-hero-title-band" aria-label="메인 타이틀">
          <HeroTitleBanner />
        </section>

        <section className="home-hero-bg relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-teal-300/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#009881]/30 bg-white/95 px-4 py-2 text-sm font-semibold text-[#007a66] shadow-sm backdrop-blur"
              >
                <Sparkles className="h-4 w-4" />
                LX 실무 중심 AI 교육
              </motion.div>

              <div className="space-y-8">
                {HERO_COPY.map((block, i) => (
                  <motion.div
                    key={block.lead}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 + i * 0.12 }}
                  >
                    <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem]">
                      {block.lead}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-slate-600 sm:text-lg">
                      {block.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <button type="button" onClick={goApply} className="btn-elice-primary">
                  AI 교육 신청하기
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/apply")}
                  className="btn-brand-secondary"
                >
                  교육 영역 먼저 보기
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <HeroPhotoCarousel />
            </motion.div>
          </div>
        </section>

        <section className="section-band section-band--lavender">
          <div className="section-inner">
            <p className="section-label">오직 LX AI 교육에서</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              기관 담당자가 빠르게 결정할 수 있는 신청 경험
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {VALUE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="trend-card p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#009881] to-[#00ad92] text-white shadow-md shadow-[#009881]/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <HomeDomainGrid />

        <section className="section-band section-band--soft">
          <div className="section-inner">
            <p className="section-label">신청 절차</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              신청은 3단계로 간단하게
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <StepCard
                step="STEP 1"
                title="기관 정보 입력"
                desc="신청기관, 일정, 장소, 교육환경, 중점 학습목표를 작성합니다."
              />
              <StepCard
                step="STEP 2"
                title="과목 선택 및 조합"
                desc="AI 숙련도와 교육 목적에 맞는 과목을 장바구니에 담아 구성합니다."
              />
              <StepCard
                step="STEP 3"
                title="LX 협의 후 확정"
                desc="제출 후 담당자 협의를 통해 최종 일정과 과정을 확정합니다."
              />
            </div>
          </div>
        </section>

        <HomeFaqSection />

        <section className="section-band section-band--white">
          <div className="section-inner !pb-24">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#009881] via-[#009881] to-[#00ad92] p-8 shadow-xl shadow-[#009881]/30 md:p-10">
              <p className="text-sm font-bold tracking-[0.12em] text-teal-100 uppercase">
                맞춤 교육 제안
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                지금 신청하면 기관 상황에 맞춰 커리큘럼을 함께 설계해드립니다
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-teal-50 md:text-base">
                신청 내용은 최종 확정 전까지 협의를 통해 조정할 수 있습니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/apply/info")}
                  className="rounded-full bg-white px-6 py-3 text-base font-bold text-[#007a66] shadow-md transition hover:bg-teal-50"
                >
                  교육 신청하기
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/apply")}
                  className="rounded-full border-2 border-white/50 bg-white/15 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/25"
                >
                  과목 먼저 둘러보기
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <AnimateRouteOverlay show={isRouting} />
    </>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <article className="trend-card p-6">
      <p className="text-xs font-bold tracking-[0.12em] text-[#009881] uppercase">{step}</p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
    </article>
  );
}

function AnimateRouteOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-none fixed inset-0 z-50 bg-white/80 backdrop-blur-sm"
    />
  );
}
