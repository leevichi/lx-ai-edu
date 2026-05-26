"use client";

import { MessageSquareText, Trash2 } from "lucide-react";

type Props = {
  requestText: string;
  onReset: () => void;
  onConfirm: () => void;
};

export function CustomDomainCart({ requestText, onReset, onConfirm }: Props) {
  const trimmed = requestText.trim();
  const canConfirm = trimmed.length >= 10;

  return (
    <div className="form-panel flex min-h-[480px] flex-col rounded-3xl border-2 border-dashed border-[#009881]/40 bg-[#f5fcfa] p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-[#009881]/20 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e6f7f4]">
          <MessageSquareText className="text-[#009881]" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">별도 조율 신청</h3>
          <p className="mt-0.5 text-sm font-semibold text-[#007a66]">과목·분야 협의 희망</p>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-[#009881]/25 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#009881]">
          희망 교육 내용 (요약)
        </p>
        {trimmed ? (
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {trimmed}
          </p>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            왼쪽 입력창에 배우고 싶은 내용을 적어 주세요. (10자 이상)
          </p>
        )}
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          담당자가 연락드릴 때 교육 분야·과목·일정을 함께 설계합니다.
        </p>
      </div>

      <div className="mt-6 flex gap-3 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={onReset}
          disabled={!trimmed}
          className="btn-brand-secondary flex flex-1 items-center justify-center gap-2 py-3.5 disabled:opacity-40"
        >
          <Trash2 size={18} />
          지우기
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!canConfirm}
          className="btn-brand-primary flex-[1.4] py-3.5 font-bold disabled:cursor-not-allowed disabled:opacity-40"
        >
          확정
        </button>
      </div>
    </div>
  );
}
