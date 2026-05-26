/** 인쇄/PDF용 HTML — A4 1페이지에 맞춘 컴팩트 양식 */
export const APPLICATION_REPORT_PRINT_CSS = `
  @page { size: A4; margin: 10mm 11mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
    font-size: 9pt; line-height: 1.35; color: #1e293b; margin: 0;
  }
  .doc { max-width: 100%; margin: 0; }
  .head {
    border-bottom: 2px solid #009881; padding-bottom: 6px; margin-bottom: 8px;
  }
  .org { font-size: 8pt; color: #007a66; font-weight: 700; margin: 0; }
  .title { font-size: 14pt; font-weight: 800; margin: 2px 0; color: #0f172a; }
  .sub { font-size: 8pt; color: #64748b; margin: 0; }
  .meta-line {
    font-size: 7.5pt; color: #64748b; margin: 4px 0 0;
  }
  .meta-line strong { color: #334155; font-weight: 600; }
  .meta-code { font-family: monospace; letter-spacing: 0.08em; }
  h2 {
    font-size: 9.5pt; color: #007a66; border-left: 3px solid #009881;
    padding-left: 6px; margin: 8px 0 4px;
  }
  table.info, table.courses { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
  table.info th, table.info td, table.courses th, table.courses td {
    border: 1px solid #e2e8f0; padding: 3px 6px; text-align: left; vertical-align: top;
  }
  table.info-pairs th {
    width: 11%; background: #f8fafc; font-weight: 700; color: #475569; font-size: 8pt;
  }
  table.info-pairs td { width: 39%; font-size: 8.5pt; }
  table.info-full th {
    width: 14%; background: #f8fafc; font-weight: 700; color: #475569; font-size: 8pt;
  }
  table.info-full td { font-size: 8.5pt; }
  table.courses th { background: #f1f5f9; font-weight: 700; font-size: 7.5pt; padding: 2px 5px; }
  table.courses td { font-size: 7.5pt; padding: 2px 5px; }
  .section-hint { font-size: 7.5pt; color: #64748b; margin: 0 0 3px; }
  .note {
    margin-top: 6px; padding: 5px 8px; background: #fffbeb;
    border: 1px solid #fcd34d; border-radius: 4px; font-size: 7pt; color: #92400e;
  }
  .footer {
    margin-top: 6px; padding-top: 4px; border-top: 1px solid #e2e8f0;
    font-size: 7pt; color: #94a3b8; text-align: center;
  }
  .custom-box {
    white-space: pre-wrap; padding: 6px 8px; background: #f8fafc;
    border: 1px solid #e2e8f0; border-radius: 4px; font-size: 8pt; max-height: 72px;
    overflow: hidden;
  }
`;

export function buildApplicationReportPrintHtml(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>LX AI 교육 희망 신청서</title>
  <style>${APPLICATION_REPORT_PRINT_CSS}</style>
</head>
<body>${bodyHtml}</body>
</html>`;
}

/** 팝업 없이 iframe으로 인쇄 대화상자 열기 */
export function printHtmlDocument(fullHtml: string): void {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("title", "신청서 인쇄");
  iframe.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
  document.body.appendChild(iframe);

  const win = iframe.contentWindow;
  const doc = win?.document;
  if (!win || !doc) {
    document.body.removeChild(iframe);
    throw new Error("인쇄 창을 열 수 없습니다.");
  }

  doc.open();
  doc.write(fullHtml);
  doc.close();

  const cleanup = () => {
    if (iframe.parentNode) document.body.removeChild(iframe);
  };

  const triggerPrint = () => {
    try {
      win.focus();
      win.print();
    } finally {
      setTimeout(cleanup, 1500);
    }
  };

  if (doc.readyState === "complete") {
    setTimeout(triggerPrint, 300);
  } else {
    iframe.onload = () => setTimeout(triggerPrint, 300);
  }
}
