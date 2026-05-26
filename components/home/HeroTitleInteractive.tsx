"use client";

import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** 데스크톱: 커서 위치 기준 은은한 줌·원근 (히어로 타이틀 영역만) */
export function HeroTitleInteractive({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [active, setActive] = useState(false);

  const reset = useCallback(() => {
    setActive(false);
    setStyle({});
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const dx = (x - 50) / 50;
    const dy = (y - 50) / 50;

    setActive(true);
    setStyle({
      transform: `perspective(1200px) rotateX(${dy * -2.2}deg) rotateY(${dx * 2.2}deg) scale(1.045)`,
      transformOrigin: `${x}% ${y}%`,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`hero-title-interactive ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div
        className="hero-title-interactive-inner"
        style={active ? style : undefined}
      >
        {children}
      </div>
    </div>
  );
}
