import { createClient } from "@supabase/supabase-js";

/** Project URL만 넣어야 함. `/rest/v1` 붙이면 연결 실패(PGRST125). */
export function normalizeSupabaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, "").replace(/\/rest\/v1\/?$/i, "");
}

export function createAdminClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const url = rawUrl ? normalizeSupabaseUrl(rawUrl) : undefined;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase 환경 변수가 없습니다. .env.local에 URL과 SERVICE_ROLE 키를 확인하세요."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
