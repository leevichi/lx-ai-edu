import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "한국국토정보공사 AI교육신청 플랫폼",
  description: "LX AI 교육 과목 신청 및 맞춤형 커리큘럼 구성",
  openGraph: {
    title: "한국국토정보공사 AI교육신청 플랫폼",
    description: "기관·지역 맞춤형 AI 교육 희망 신청",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/hero/hero-title.png", width: 2560, height: 1080, alt: "LX EDUCATION" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
