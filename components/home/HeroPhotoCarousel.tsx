"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

export type EducationSlide = {
  id: string;
  image: string;
  alt: string;
  caption: string;
  description: string;
};

const SLIDE_IMAGE_VERSION = "v1";

const SLIDES: EducationSlide[] = [
  {
    id: "1",
    image: `/education/1.jpg?v=${SLIDE_IMAGE_VERSION}`,
    alt: "지역주민 대상 평생교육 현장",
    caption: "지역주민 대상 평생교육",
    description: "RISE사업 등 지역 수요 맞춤형 평생교육 진행",
  },
  {
    id: "2",
    image: `/education/2.jpg?v=${SLIDE_IMAGE_VERSION}`,
    alt: "산학협력 미래인재 양성교육",
    caption: "산학협력 미래인재 양성교육",
    description: "지역대학과 연계한 학생대상 일경험 프로젝트",
  },
  {
    id: "3",
    image: `/education/3.jpg?v=${SLIDE_IMAGE_VERSION}`,
    alt: "요구사항을 반영한 맞춤형 교육",
    caption: "요구사항을 반영한 맞춤형 교육",
    description: "대상, 인원, 목적에 따른 수준 맞춤형 교육",
  },
  {
    id: "4",
    image: `/education/4.jpg?v=${SLIDE_IMAGE_VERSION}`,
    alt: "현장 중심 실무형 교육 과정",
    caption: "현장 중심 실무형 교육 과정",
    description: "LX가 진행하는 GIS, 공간정보, 지적 실무체험 교육",
  },
];

const INTERVAL_MS = 3000;

export function HeroPhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[index];
  const slideDuration = reduceMotion ? 0 : 0.45;

  return (
    <div className="hero-frame w-full max-w-lg lg:max-w-none">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 48, scale: reduceMotion ? 1 : 1.04 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -48, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: slideDuration, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur hover:bg-white"
          aria-label={paused ? "슬라이드 재생" : "슬라이드 일시정지"}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>

      <div className="mt-4 min-h-[4.5rem] px-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
          >
            <p className="text-base font-bold text-slate-900 md:text-lg">{slide.caption}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-[0.95rem]">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`${i + 1}번째 사진`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-7 bg-[#009881]" : "w-2 bg-slate-300 hover:bg-teal-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
