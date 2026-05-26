import Link from "next/link";
import { HomeHeader } from "@/components/home/HomeHeader";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function PrivacyPage() {
  return (
    <>
      <HomeHeader />
      <main className="bg-white">
        <div className="section-inner max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-[#009881] hover:underline">
            ← 홈
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">개인정보처리방침</h1>
          <div className="mt-8">
            <PrivacyPolicyContent />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
