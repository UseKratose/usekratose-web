const AUTH_ERROR_MESSAGES: Readonly<Record<string, string>> = {
  access_denied: "Authentication was cancelled or denied. Please try again.",
  auth_failed: "We could not complete authentication. Please try again.",
  configuration: "Authentication is temporarily unavailable.",
  missing_code: "This verification link is invalid or has expired. Request a new link and try again.",
  otp_expired: "This verification link has expired. Request a new link and try again.",
};

export function authRedirectErrorMessage(
  query: URLSearchParams,
  hash: string,
): string | null {
  const fragment = new URLSearchParams(hash.replace(/^#/, ""));
  const errorCode =
    fragment.get("error_code") ?? fragment.get("error") ?? query.get("error");
  if (errorCode === null) return null;

  return (
    AUTH_ERROR_MESSAGES[errorCode] ??
    fragment.get("error_description")?.replace(/\+/g, " ") ??
    "Authentication could not be completed. Please try again."
  );
}
