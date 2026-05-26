import { describe, it } from "node:test";
import assert from "node:assert";
import {
  isValidPhone,
  validateApplicationBody,
} from "../lib/validate-application.ts";

describe("isValidPhone", () => {
  it("accepts korean mobile", () => {
    assert.equal(isValidPhone("010-1234-5678"), true);
  });
  it("rejects too short", () => {
    assert.equal(isValidPhone("123"), false);
  });
});

describe("validateApplicationBody", () => {
  const base = {
    privacy_agreed: true,
    company_website: "",
    agency: "테스트기관",
    contact_name: "홍길동",
    contact_phone: "010-1234-5678",
    ai_level: 4,
    courses: [{ id: "D01-01", title: "t" }],
  };

  it("rejects honeypot", () => {
    const r = validateApplicationBody({ ...base, company_website: "spam" });
    assert.equal(r.ok, false);
  });

  it("requires privacy", () => {
    const r = validateApplicationBody({ ...base, privacy_agreed: false });
    assert.equal(r.ok, false);
  });

  it("accepts valid body", () => {
    const r = validateApplicationBody(base);
    assert.equal(r.ok, true);
  });

  it("accepts custom curriculum without courses", () => {
    const r = validateApplicationBody({
      ...base,
      courses: [],
      custom_curriculum: true,
      custom_curriculum_request: "생성형 AI와 행정 문서 작성 실습을 원합니다.",
    });
    assert.equal(r.ok, true);
  });

  it("requires custom request text when custom curriculum", () => {
    const r = validateApplicationBody({
      ...base,
      courses: [],
      custom_curriculum: true,
      custom_curriculum_request: "",
    });
    assert.equal(r.ok, false);
  });
});
