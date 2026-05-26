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
    <header className="home-header sticky top-0 z-40 border-b border-[#009881]/15 bg-white/90 backdrop-blur-xl">
      <div className="home-header-inner mx-auto max-w-7xl px-3 py-2 md:px-8 md:py-3.5 lg:py-4">
        <Link href="/" className="home-header-brand group block max-w-full shrink-0">
          <span
            className={`${paperlogyBlack.className} home-header-title block leading-tight tracking-tight text-slate-900 transition-opacity group-hover:opacity-90`}
          >
            <span className="text-[#009881]">한국국토정보공사</span>
            <span className="text-slate-900"> 교육신청 플랫폼</span>
          </span>
        </Link>

        <nav className="home-header-nav" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="home-nav-link shrink-0">
              {item.label}
            </Link>
          ))}
          <Link href="/apply/info" className="home-nav-cta shrink-0">
            교육 신청하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
