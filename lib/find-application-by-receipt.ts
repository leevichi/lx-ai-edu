import type { SupabaseClient } from "@supabase/supabase-js";
import { APPLICATIONS_TABLE, type ApplicationRow } from "./applications";
import { formatReceiptCode, normalizePhoneDigits } from "./receipt";

export function normalizeReceiptInput(input: string): string {
  return input.replace(/\s/g, "").replace(/-/g, "").toUpperCase().slice(0, 8);
}

export function applicationMatchesReceipt(
  row: { id: string; contact_phone: string },
  receiptCode: string,
  phoneDigits: string
): boolean {
  return (
    formatReceiptCode(row.id) === receiptCode &&
    normalizePhoneDigits(row.contact_phone) === phoneDigits
  );
}

function isMissingRpcError(message: string): boolean {
  return (
    message.includes("lookup_application_by_receipt") ||
    message.includes("PGRST202") ||
    message.includes("Could not find the function")
  );
}

/** 접수번호·연락처로 신청 1건 조회 (UUID ilike 미사용 — PostgREST uuid 연산 오류 회피) */
export async function findApplicationByReceipt(
  supabase: SupabaseClient,
  receiptInput: string,
  phoneInput: string
): Promise<{ application: ApplicationRow | null; queryError: string | null }> {
  const receiptCode = normalizeReceiptInput(receiptInput);
  const phoneDigits = normalizePhoneDigits(phoneInput);

  const rpc = await supabase.rpc("lookup_application_by_receipt", {
    receipt_code: receiptCode,
    phone_digits: phoneDigits,
  });

  if (!rpc.error && Array.isArray(rpc.data) && rpc.data.length > 0) {
    return { application: rpc.data[0] as ApplicationRow, queryError: null };
  }

  if (rpc.error && !isMissingRpcError(rpc.error.message)) {
    console.warn("[lookup] rpc failed, falling back to scan:", rpc.error.message);
  }

  const { data, error } = await supabase
    .from(APPLICATIONS_TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return { application: null, queryError: error.message };
  }

  const match = (data ?? []).find((row) =>
    applicationMatchesReceipt(
      { id: row.id as string, contact_phone: row.contact_phone as string },
      receiptCode,
      phoneDigits
    )
  );

  return { application: (match as ApplicationRow | undefined) ?? null, queryError: null };
}
