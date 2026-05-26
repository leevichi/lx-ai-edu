/**
 * Run: node --env-file=.env.local scripts/test-supabase-insert.mjs
 * Supabase insert 오류 원인 확인용 (로컬만)
 */
import { createClient } from "@supabase/supabase-js";
import { normalizeSupabaseUrl } from "../lib/supabase/admin.ts";

const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("URL set:", Boolean(url));
console.log("SERVICE_ROLE set:", Boolean(key));
if (url) console.log("URL prefix:", url.slice(0, 30) + "...");

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const sample = {
  agency: "테스트기관",
  contact_name: "테스트",
  contact_phone: "010-0000-0000",
  ai_level: 3,
  course_ids: ["C001"],
  courses: [
    {
      id: "C001",
      domainId: "D01",
      domainName: "테스트",
      order: 1,
      title: "테스트과목",
      levelMin: 1,
      levelMax: 3,
      durationHours: 2,
      format: "오프라인",
      practiceRatio: 50,
      tags: [],
      outcomes: "",
      prerequisiteIds: [],
      excludeWithIds: [],
      isCore: false,
    },
  ],
  auto_added_ids: [],
  total_hours: 2,
};

const { data, error } = await supabase
  .from("applications")
  .insert(sample)
  .select("id")
  .single();

if (error) {
  console.error("INSERT FAILED");
  console.error("code:", error.code);
  console.error("message:", error.message);
  console.error("details:", error.details);
  console.error("hint:", error.hint);
  process.exit(1);
}

console.log("INSERT OK, id:", data.id);
