import { SITE } from "./site-config";
import type { ApplicationInsert } from "./applications";

type NotifyPayload = ApplicationInsert & {
  id: string;
  created_at: string;
};

function buildSummary(row: NotifyPayload): string {
  const courses = row.courses.map((c) => c.title).join(", ");
  return [
    `[LX AI 교육 신청] ${row.agency}`,
    `담당: ${row.contact_name} / ${row.contact_phone}`,
    `인원: ${row.participant_count} · AI Lv.${row.ai_level} · ${row.total_hours}시간`,
    `과목(${row.courses.length}): ${courses}`,
    `접수: ${row.created_at}`,
    `ID: ${row.id}`,
  ].join("\n");
}

export async function notifyNewApplication(row: NotifyPayload): Promise<void> {
  const text = buildSummary(row);
  const webhook = process.env.NOTIFY_WEBHOOK_URL?.trim();

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          content: text,
          message: text,
        }),
      });
    } catch (err) {
      console.error("[notify] webhook failed:", err);
    }
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.NOTIFY_EMAIL_TO?.trim();
  const from =
    process.env.NOTIFY_EMAIL_FROM?.trim() ?? "LX Education <onboarding@resend.dev>";

  if (resendKey && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: `[${SITE.platformName}] ${row.agency} 신청 접수`,
          text,
        }),
      });
    } catch (err) {
      console.error("[notify] email failed:", err);
    }
  }

  if (!webhook && !(resendKey && to)) {
    console.info("[notify] no NOTIFY_WEBHOOK_URL or RESEND — logged only:\n", text);
  }
}
