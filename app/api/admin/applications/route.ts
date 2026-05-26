import { NextResponse } from "next/server";
import { APPLICATIONS_TABLE } from "@/lib/applications";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from(APPLICATIONS_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/applications] fetch failed:", error.message);
      return NextResponse.json(
        { error: "신청 목록을 불러오지 못했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ applications: data ?? [] });
  } catch (err) {
    console.error("[admin/applications] unexpected error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
