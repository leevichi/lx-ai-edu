import { describe, it } from "node:test";
import assert from "node:assert";
import {
  normalizeReceiptInput,
  applicationMatchesReceipt,
} from "../lib/find-application-by-receipt.ts";
import { formatReceiptCode } from "../lib/receipt.ts";

describe("normalizeReceiptInput", () => {
  it("strips spaces and hyphens", () => {
    assert.equal(normalizeReceiptInput(" ab-cd-ef "), "ABCDEF");
  });
});

describe("applicationMatchesReceipt", () => {
  const id = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

  it("matches receipt and phone", () => {
    assert.equal(
      applicationMatchesReceipt(
        { id, contact_phone: "010-1234-5678" },
        formatReceiptCode(id),
        "01012345678"
      ),
      true
    );
  });

  it("rejects wrong phone", () => {
    assert.equal(
      applicationMatchesReceipt(
        { id, contact_phone: "010-1234-5678" },
        formatReceiptCode(id),
        "01099999999"
      ),
      false
    );
  });
});
