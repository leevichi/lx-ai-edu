"use client";

import { useRef } from "react";
import { FileDown } from "lucide-react";
import type { ApplicationReportData } from "@/lib/application-report";
import {
  buildApplicationReportPrintHtml,
  printHtmlDocument,
} from "@/lib/print-application-report";
import { ApplicationReportDocument } from "./ApplicationReportDocument";

type Props = {
  data: ApplicationReportData;
  className?: string;
};

export function ApplicationPdfExport({ data, className = "" }: Props) {
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    if (!reportRef.current) return;
    const html = reportRef.current.innerHTML;
    if (!html.trim()) {
      alert("인쇄할 내용을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    try {
      printHtmlDocument(buildApplicationReportPrintHtml(html));
    } catch {
      alert("인쇄 창을 열 수 없습니다. 브라우저 설정을 확인한 뒤 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <div
        ref={reportRef}
        className="pointer-events-none fixed left-[-10000px] top-0 w-[210mm] bg-white"
        aria-hidden
      >
        <ApplicationReportDocument data={data} />
      </div>
      <button type="button" onClick={handleExport} className={className}>
        <FileDown size={18} />
        신청 내역 PDF 저장 (인쇄)
      </button>
    </>
  );
}
