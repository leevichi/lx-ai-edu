import { NextResponse } from "next/server";
import { APPLICATIONS_TABLE } from "@/lib/applications";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/lib/site-config";
import { createAdminClient } from "@/lib/supabase/admin";

const STATUSES = Object.keys(APPLICATION_STATUS_LABELS) as ApplicationStatus[];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { status?: string };

  if (!body.status || !STATUSES.includes(body.status as ApplicationStatus)) {
    return NextResponse.json({ error: "유효하지 않은 상태입니다." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from(APPLICATIONS_TABLE)
      .update({ status: body.status })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("[admin/applications/patch]", error.message);
      return NextResponse.json(
        { error: "상태 변경에 실패했습니다. status 칸이 있는지 SQL을 확인해 주세요." },
        { status: 500 }
      );
    }

    return NextResponse.json({ application: data });
  } catch (err) {
    console.error("[admin/applications/patch] unexpected:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
