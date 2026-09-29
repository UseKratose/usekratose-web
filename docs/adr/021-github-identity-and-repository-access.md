# ADR 021: Separate GitHub identity from repository authorization

## Status

Accepted.

## Context

UseKratose supports signing in with GitHub and connecting source repositories to
monitored Solana programs. These are different trust decisions. Social login
proves which GitHub identity authenticated, but it must not silently grant broad
access to private repositories or write access to source code.

## Decision

- Supabase GitHub OAuth is used for authentication and account identity only.
- A GitHub App is used for repository authorization.
- The user chooses the organizations and repositories available to the GitHub
  App during installation.
- UseKratose lists repositories through a short-lived installation access token.
- Installation IDs and private keys are server-side data and are never entered
  manually in the dashboard.
- Once one workspace program has authorized the GitHub App, the same project can
  reuse that installation when connecting another program.
- Public repositories can still be connected through a collapsed manual URL
  fallback when the repository is not owned by the signed-in GitHub account.
- Uploaded source, IDL, and `.so` evidence remains an independent first-class
  path and appears before repository connection in the interface.

## Permissions

The GitHub App requests only:

- Metadata: read
- Contents: read and write
- Pull requests: read and write

Write permissions exist solely to create reviewable fix branches and pull
requests after an explicit per-finding user decision. UseKratose never writes to
the default branch and never deploys a program from this flow.

## Consequences

GitHub sign-in feels connected because the dashboard recognizes the provider,
but first-time private repository access still requires the GitHub installation
consent screen. This extra step is intentional least privilege, not duplicated
authentication.
