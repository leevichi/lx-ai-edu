import Link from "next/link";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
};

export function PrivacyConsentField({ checked, onChange }: Props) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-[#009881] focus:ring-[#009881]"
        required
      />
      <span className="text-sm leading-relaxed text-slate-700">
        <Link href="/privacy" className="font-semibold text-[#009881] underline-offset-2 hover:underline" target="_blank">
          개인정보 수집·이용
        </Link>
        에 동의합니다. (필수) 신청 정보는 교육 상담·일정 확정 목적으로만 사용됩니다.
      </span>
    </label>
  );
}
