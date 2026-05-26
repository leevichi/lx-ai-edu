"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5fcfa] px-6 text-center">
      <h1 className="text-xl font-bold text-slate-900">일시적인 오류가 발생했습니다</h1>
      <p className="mt-2 max-w-md text-sm text-slate-600">
        {error.message || "페이지를 불러오지 못했습니다."}
      </p>
      <button type="button" onClick={reset} className="btn-brand-primary mt-6">
        다시 시도
      </button>
    </div>
  );
}
