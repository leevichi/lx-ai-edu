import { NextResponse } from "next/server";
import { findApplicationByReceipt } from "@/lib/find-application-by-receipt";
import { normalizePhoneDigits } from "@/lib/receipt";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = checkRateLimit(`lookup:${ip}`);
    if (!limited.ok) {
      return NextResponse.json(
        { error: `잠시 후 다시 시도해 주세요. (${limited.retryAfterSec}초)` },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      receipt_code?: string;
      contact_phone?: string;
    };

    const code = (body.receipt_code ?? "").replace(/\s/g, "").toUpperCase();
    const phoneDigits = normalizePhoneDigits(body.contact_phone ?? "");

    if (code.replace(/-/g, "").length < 8) {
      return NextResponse.json(
        { error: "접수번호 8자리를 입력해 주세요." },
        { status: 400 }
      );
    }
    if (phoneDigits.length < 9) {
      return NextResponse.json(
        { error: "신청 시 입력한 연락처를 입력해 주세요." },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = createAdminClient();
    } catch (err) {
      console.error("[lookup] admin client", err);
      return NextResponse.json(
        { error: "서버 설정 오류입니다. 관리자에게 문의해 주세요." },
        { status: 503 }
      );
    }

    const { application, queryError } = await findApplicationByReceipt(
      supabase,
      code,
      body.contact_phone ?? ""
    );

    if (queryError) {
      console.error("[lookup]", queryError);
      return NextResponse.json(
        { error: "조회에 실패했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 500 }
      );
    }

    if (!application) {
      return NextResponse.json(
        { error: "접수번호와 연락처가 일치하는 신청을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });
  } catch (err) {
    console.error("[lookup] unexpected", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
