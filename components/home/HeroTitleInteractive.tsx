"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** 데스크톱: 커서 위치 기준 은은한 줌·원근 (히어로 타이틀 영역만) */
export function HeroTitleInteractive({ children, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const reset = () => {
      inner.style.transform = "";
      inner.style.transformOrigin = "";
    };

    const onMove = (e: PointerEvent) => {
      // 터치만 있는 기기에서는 비활성 (데스크톱·트랙패드는 pointerType mouse/pen)
      if (e.pointerType === "touch") return;

      const rect = root.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const dx = (x - 50) / 50;
      const dy = (y - 50) / 50;

      inner.style.transformOrigin = `${x}% ${y}%`;
      inner.style.transform = `perspective(1200px) rotateX(${dy * -2.2}deg) rotateY(${dx * 2.2}deg) scale(1.045)`;
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", reset, { passive: true });

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={rootRef} className={`hero-title-interactive ${className}`}>
      <div ref={innerRef} className="hero-title-interactive-inner">
        {children}
      </div>
    </div>
  );
}
