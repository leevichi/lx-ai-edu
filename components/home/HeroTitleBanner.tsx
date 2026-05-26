"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { paperlogyBlack } from "@/lib/fonts/paperlogy";
import { HeroTitleInteractive } from "./HeroTitleInteractive";

export const HERO_TITLE_IMAGE_PATH = "/hero/hero-title.png";

const HERO_TITLE_WIDTH = 2560;
const HERO_TITLE_HEIGHT = 1080;
const HERO_TITLE_CACHE_VERSION = "2560x1080-full";

type HeroTitleBannerProps = {
  src?: string;
  alt?: string;
};

export function HeroTitleBanner({
  src = HERO_TITLE_IMAGE_PATH,
  alt = "지역과 성장하는 교육 LX EDUCATION — Spatial Information and Artificial Intelligence",
}: HeroTitleBannerProps) {
  const [useTextFallback, setUseTextFallback] = useState(false);

  if (useTextFallback) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="hero-title-fallback px-5 py-16 md:py-20"
      >
        <p className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase md:text-base">
          Spatial Information and Artificial Intelligence
        </p>
        <h1
          className={`${paperlogyBlack.className} mt-4 text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl`}
        >
          지역과 성장하는 교육
        </h1>
        <p className="mt-3 text-2xl font-extrabold tracking-wide text-white md:text-3xl">
          LX EDUCATION
        </p>
      </motion.div>
    );
  }

  return (
    <HeroTitleInteractive className="hero-title-banner">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${src}?v=${HERO_TITLE_CACHE_VERSION}`}
          srcSet={`${src}?v=${HERO_TITLE_CACHE_VERSION} ${HERO_TITLE_WIDTH}w`}
          sizes="100vw"
          alt={alt}
          width={HERO_TITLE_WIDTH}
          height={HERO_TITLE_HEIGHT}
          decoding="async"
          fetchPriority="high"
          className="hero-title-banner-img"
          onError={() => setUseTextFallback(true)}
        />
      </motion.div>
    </HeroTitleInteractive>
  );
}
