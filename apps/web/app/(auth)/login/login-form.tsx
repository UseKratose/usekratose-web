"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { safeRedirectPath } from "@/lib/navigation-security";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = safeRedirectPath(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (searchParams.has("redirect")) return;

    let active = true;
    void getSupabaseBrowserClient()
      .auth.getUser()
      .then(({ data }) => {
        if (active && data.user !== null) {
          window.location.replace("/dashboard");
        }
      });

    return () => {
      active = false;
    };
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const supabase = getSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setPending(false);
      return;
    }

    window.location.assign(redirectTo);
  }

  async function handleOAuth(provider: "github") {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
      },
    });
  }

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h1>Welcome back</h1>
        <p>Sign in to your UseKratose account</p>
      </div>

      <div className="oauth-buttons">
        <button
          className="oauth-btn"
          onClick={() => handleOAuth("github")}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>
      </div>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email address
          <input
            autoComplete="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label>
          Password
          <input
            autoComplete="current-password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            type="password"
            value={password}
          />
        </label>
        <div className="auth-extras">
          <Link className="auth-link" href="/forgot-password">
            Forgot password?
          </Link>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="button auth-submit" disabled={pending} type="submit">
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="auth-footer-text">
        Don&apos;t have an account?{" "}
        <Link className="auth-link accent" href="/signup">
          Create one
        </Link>
      </p>
    </div>
  );
}
