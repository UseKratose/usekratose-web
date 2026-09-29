import { describe, expect, it } from "vitest";

import { authRedirectErrorMessage } from "../lib/auth-errors.js";

describe("authentication redirect errors", () => {
  it("explains an expired verification link", () => {
    expect(
      authRedirectErrorMessage(
        new URLSearchParams("error=missing_code"),
        "#error=access_denied&error_code=otp_expired",
      ),
    ).toBe(
      "This verification link has expired. Request a new link and try again.",
    );
  });

  it("returns null when the redirect has no error", () => {
    expect(authRedirectErrorMessage(new URLSearchParams(), "")).toBeNull();
  });
});
