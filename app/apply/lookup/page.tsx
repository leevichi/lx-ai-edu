"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { HomeHeader } from "@/components/home/HomeHeader";
import { ApplicationPdfExport } from "@/components/apply/ApplicationPdfExport";
import { ApplicationLookupDetail } from "@/components/apply/ApplicationLookupDetail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import type { ApplicationRow } from "@/lib/applications";
import { buildReportFromRow } from "@/lib/build-application-report";

export default function ApplyLookupPage() {
  const [receiptCode, setReceiptCode] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [application, setApplication] = useState<ApplicationRow | null>(null);

  const handleLookup = async () => {
    setLoading(true);
    setError("");
    setApplication(null);
    try {
      const res = await fetch("/api/applications/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receipt_code: receiptCode.trim(),
          contact_phone: contactPhone.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "조회에 실패했습니다.");
        return;
      }
      setApplication(data.application as ApplicationRow);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const report = application ? buildReportFromRow(application) : null;

  return (
    <>
      <HomeHeader />
      <main className="bg-white">
        <div className="section-inner max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-[#009881] hover:underline">
            ← 홈
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">신청 내역 조회</h1>
          <p className="mt-2 text-slate-600">
            접수 완료 시 안내된 <strong>접수번호 8자리</strong>와 신청 시 입력한{" "}
            <strong>연락처</strong>로 조회합니다.
          </p>

          <div className="form-panel mt-8 space-y-4 p-6">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                접수번호 (8자리)
              </span>
              <input
                type="text"
                value={receiptCode}
                onChange={(e) => setReceiptCode(e.target.value.toUpperCase())}
                placeholder="예: A1B2C3D4"
                maxLength={8}
                className="input-light font-mono tracking-widest uppercase"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">연락처</span>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="신청 시 입력한 번호"
                className="input-light"
              />
            </label>
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <button
              type="button"
              onClick={handleLookup}
              disabled={loading}
              className="btn-brand-primary flex w-full items-center justify-center gap-2 py-3.5"
            >
              <Search size={18} />
              {loading ? "조회 중…" : "조회하기"}
            </button>
          </div>

          {report && (
            <div className="mt-10 space-y-5">
              <ApplicationPdfExport
                data={report}
                className="btn-brand-primary flex w-full items-center justify-center gap-2 py-3.5"
              />
              <ApplicationLookupDetail data={report} />
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
