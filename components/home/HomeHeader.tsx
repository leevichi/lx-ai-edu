import Link from "next/link";
import { paperlogyBlack } from "@/lib/fonts/paperlogy";

const NAV_ITEMS = [
  { href: "/#domains", label: "교육 영역" },
  { href: "/apply/info", label: "신청 안내" },
  { href: "/apply/lookup", label: "신청 조회" },
  { href: "/#faq", label: "자주 묻는 질문" },
] as const;

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#009881]/15 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-4 md:px-8 lg:flex-nowrap lg:gap-8">
        <Link href="/" className="group shrink-0">
          <span
            className={`${paperlogyBlack.className} block text-[1.4rem] leading-tight tracking-tight text-slate-900 transition-opacity group-hover:opacity-90 md:text-[1.55rem] lg:text-[1.7rem]`}
          >
            <span className="text-[#009881]">한국국토정보공사</span>
            <span className="ml-1.5 text-slate-900">교육신청 플랫폼</span>
          </span>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center justify-end gap-2 md:gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="home-nav-link rounded-full px-4 py-2.5 text-[0.95rem] font-semibold text-slate-700 md:px-5 md:py-3 md:text-base"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/apply/info" className="home-nav-cta rounded-full px-5 py-2.5 text-[0.95rem] font-bold text-white md:px-6 md:py-3 md:text-base">
            교육 신청하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
