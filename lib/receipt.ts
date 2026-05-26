/** 접수번호 표시용 (UUID 앞 8자리, 하이픈 제외) */
export function formatReceiptCode(applicationId: string): string {
  return applicationId.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export function normalizePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
