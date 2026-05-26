import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "lx_admin_session";

export function getAdminSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "1234";
  const pepper =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "lx-ai-edu-dev";

  return createHash("sha256")
    .update(`lx-admin:${password}:${pepper}`)
    .digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!value) return false;

  const expected = getAdminSessionToken();
  if (value.length !== expected.length) return false;

  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}
