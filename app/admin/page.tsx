"use client";

import { useCallback, useEffect, useState } from "react";
import { Lock, LogOut, RefreshCw, X } from "lucide-react";
import type { ApplicationRow } from "@/lib/applications";
import {
  APPLICATION_STATUS_LABELS,
  SITE,
  type ApplicationStatus,
} from "@/lib/site-config";

const VENUE_LABELS: Record<string, string> = {
  internal: "내부강의실",
  external: "외부강의실",
  other: "기타",
};

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [detail, setDetail] = useState<ApplicationRow | null>(null);
  const [statusSaving, setStatusSaving] = useState(false);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/applications");
      if (res.status === 401) {
        setIsAuthorized(false);
        setFetchError("다시 로그인해 주세요.");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setFetchError(data.error ?? "목록을 불러오지 못했습니다.");
        return;
      }
      setApplications(data.applications ?? []);
    } catch {
      setFetchError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;
    loadApplications();
  }, [isAuthorized, loadApplications]);

  const handleLogin = async () => {
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setLoginError(data.error ?? "로그인에 실패했습니다.");
        return;
      }
      setIsAuthorized(true);
      setPassword("");
    } catch {
      setLoginError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthorized(false);
    setApplications([]);
    setDetail(null);
  };

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    setStatusSaving(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? "상태 변경 실패");
        return;
      }
      const updated = data.application as ApplicationRow;
      setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)));
      setDetail(updated);
    } catch {
      alert("네트워크 오류");
    } finally {
      setStatusSaving(false);
    }
  };

  const exportCsv = () => {
    if (applications.length === 0) return;
    const header = [
      "신청일시",
      "상태",
      "기관명",
      "담당자",
      "연락처",
      "수강인원",
      "교육대상",
      "희망일",
      "날짜무관",
      "장소",
      "교육환경",
      "AI숙련도",
      "총시간",
      "과목수",
      "과목목록",
      "신청사유",
      "중점학습",
      "별도조율",
      "별도조율내용",
    ];
    const rows = applications.map((a) => [
      formatDate(a.created_at),
      statusLabel(a.status),
      a.agency,
      a.contact_name,
      a.contact_phone,
      String(a.participant_count ?? ""),
      a.education_target ?? "",
      a.date_flexible
        ? "상관없음"
        : a.preferred_date
          ? new Date(a.preferred_date).toLocaleDateString("ko-KR")
          : "",
      a.date_flexible ? "Y" : "N",
      venueDisplay(a),
      envDisplay(a),
      String(a.ai_level),
      String(a.total_hours),
      String(a.courses?.length ?? 0),
      (a.courses ?? []).map((c) => c.title).join(" / "),
      a.application_reason ?? "",
      a.learning_focus ?? "",
      a.custom_curriculum ? "Y" : "N",
      a.custom_curriculum_request ?? "",
    ]);
    const csv = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lx-ai-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5fcfa] p-6">
        <div className="form-panel w-full max-w-md p-10 text-center">
          <Lock className="mx-auto mb-6 text-[#009881]" size={48} />
          <h2 className="text-2xl font-bold text-slate-900">관리자 인증</h2>
          <p className="mt-2 text-sm text-slate-600">.env.local의 ADMIN_PASSWORD</p>
          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={password}
            className="input-light mt-6 text-center"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {loginError && <p className="mt-3 text-sm text-red-600">{loginError}</p>}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loggingIn}
            className="btn-brand-primary mt-4 w-full py-3.5 disabled:opacity-50"
          >
            {loggingIn ? "확인 중…" : "접속하기"}
          </button>
        </div>
      </div>
    );
  }

  const totalCount = applications.length;
  const thisMonth = applications.filter((a) => isThisMonth(a.created_at)).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <header className="border-b border-[#009881]/15 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
              {SITE.platformName} · 관리
            </h1>
            <p className="text-sm text-slate-500">신청 접수 목록</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={loadApplications}
              disabled={loading}
              className="btn-brand-secondary py-2 text-sm"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              새로고침
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={applications.length === 0}
              className="btn-brand-primary py-2 text-sm disabled:opacity-40"
            >
              CSV보내기
            </button>
            <button type="button" onClick={handleLogout} className="btn-brand-secondary py-2 text-sm">
              <LogOut size={16} />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <StatCard title="총 신청" value={`${totalCount}건`} />
          <StatCard title="이번 달" value={`${thisMonth}건`} />
        </div>

        <div className="form-panel overflow-hidden">
          {fetchError && (
            <p className="border-b border-red-100 bg-red-50 p-4 text-sm text-red-700">{fetchError}</p>
          )}
          {loading && applications.length === 0 ? (
            <p className="p-10 text-center text-slate-500">불러오는 중…</p>
          ) : applications.length === 0 ? (
            <p className="p-10 text-center text-slate-500">아직 신청이 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-3 font-semibold">일시</th>
                    <th className="p-3 font-semibold">상태</th>
                    <th className="p-3 font-semibold">기관</th>
                    <th className="p-3 font-semibold">담당자</th>
                    <th className="p-3 font-semibold">인원</th>
                    <th className="p-3 font-semibold">과목</th>
                    <th className="p-3 font-semibold" />
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-t border-slate-100 hover:bg-slate-50/80">
                      <td className="p-3 whitespace-nowrap text-slate-600">
                        {formatDate(app.created_at)}
                      </td>
                      <td className="p-3">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="p-3 font-medium">{app.agency}</td>
                      <td className="p-3">{app.contact_name}</td>
                      <td className="p-3">{app.participant_count}명</td>
                      <td className="p-3 max-w-[200px] truncate text-slate-600">
                        {(app.courses ?? []).map((c) => c.title).join(", ")}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => setDetail(app)}
                          className="text-sm font-semibold text-[#009881] hover:underline"
                        >
                          상세
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="닫기"
            onClick={() => setDetail(null)}
          />
          <div className="form-panel relative max-h-[90vh] w-full overflow-y-auto sm:max-w-2xl">
            <div className="sticky top-0 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <p className="text-xs text-slate-500">{formatDate(detail.created_at)}</p>
                <h2 className="mt-1 text-xl font-bold">{detail.agency}</h2>
                <StatusBadge status={detail.status} />
              </div>
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 p-6 text-sm">
              <label className="block">
                <span className="font-semibold text-slate-700">처리 상태</span>
                <select
                  value={detail.status ?? "received"}
                  disabled={statusSaving}
                  onChange={(e) =>
                    updateStatus(detail.id, e.target.value as ApplicationStatus)
                  }
                  className="input-light mt-1"
                >
                  {(Object.keys(APPLICATION_STATUS_LABELS) as ApplicationStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {APPLICATION_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </label>
              <DetailRow label="담당자" value={`${detail.contact_name} · ${detail.contact_phone}`} />
              <DetailRow label="수강인원" value={`${detail.participant_count}명`} />
              <DetailRow label="교육대상" value={detail.education_target || "—"} />
              <DetailRow
                label="희망일"
                value={
                  detail.date_flexible
                    ? "날짜 상관없음"
                    : detail.preferred_date
                      ? new Date(detail.preferred_date).toLocaleDateString("ko-KR")
                      : "—"
                }
              />
              <DetailRow label="장소" value={venueDisplay(detail)} />
              <DetailRow label="교육환경" value={envDisplay(detail)} />
              <DetailRow label="AI 숙련도" value={`Lv.${detail.ai_level}`} />
              <DetailRow label="총 시간" value={`${detail.total_hours}시간`} />
              {detail.custom_curriculum ? (
                <DetailRow
                  label="별도 조율 희망"
                  value={detail.custom_curriculum_request || "—"}
                  multiline
                />
              ) : (
                <div>
                  <p className="font-semibold text-slate-700">희망 과목</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                    {(detail.courses ?? []).map((c) => (
                      <li key={c.id}>{c.title}</li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.application_reason && (
                <DetailRow label="신청사유" value={detail.application_reason} multiline />
              )}
              {detail.learning_focus && (
                <DetailRow label="중점 학습" value={detail.learning_focus} multiline />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="trend-card p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-[#009881]">{value}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="font-semibold text-slate-700">{label}</p>
      <p className={`mt-1 text-slate-600 ${multiline ? "whitespace-pre-wrap" : ""}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status?: ApplicationStatus }) {
  const s = status ?? "received";
  const colors: Record<ApplicationStatus, string> = {
    received: "bg-slate-100 text-slate-700",
    reviewing: "bg-amber-100 text-amber-800",
    confirmed: "bg-[#e6f7f4] text-[#007a66]",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[s]}`}>
      {APPLICATION_STATUS_LABELS[s]}
    </span>
  );
}

function statusLabel(status?: ApplicationStatus) {
  return APPLICATION_STATUS_LABELS[status ?? "received"];
}

function venueDisplay(a: ApplicationRow) {
  if (a.venue_type === "other") return a.venue_other || "기타";
  return VENUE_LABELS[a.venue_type] ?? a.venue_type;
}

function envDisplay(a: ApplicationRow) {
  const parts = [
    a.env_student_pc && "수강생 PC",
    a.env_instructor_pc && "강사 PC",
    a.env_projector && "빔프로젝터",
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}
