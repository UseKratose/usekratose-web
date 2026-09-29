import {
  authenticateDashboardRequest,
  dashboardUnauthorized,
} from "@/lib/dashboard-api-auth";
import { createServerDatabase } from "@/lib/database";
import { listGitHubInstallationRepositories } from "@/lib/github-source";
import { loadProgramContext } from "@/lib/program-query";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  route: { params: Promise<{ programId: string }> },
): Promise<Response> {
  const user = await authenticateDashboardRequest(request);
  if (user === null) return dashboardUnauthorized();
  const database = createServerDatabase();
  if (database === null) {
    return Response.json(
      { error: { message: "Database unavailable" } },
      { status: 503 },
    );
  }
  try {
    const { programId } = await route.params;
    const project = await database.store.getProjectForUser(user.id);
    const context =
      project === null
        ? null
        : await loadProgramContext(database.store, programId, project.id);
    if (project === null || context === null) {
      return Response.json(
        { error: { message: "Program not found" } },
        { status: 404 },
      );
    }
    const workspace = await database.store.getProgramSourceWorkspace(
      project.id,
      context.program.id,
    );
    const installationId =
      workspace?.githubInstallationId ??
      (await database.store.getGitHubInstallationForProject(project.id));
    const githubIdentityConnected = (user.identities ?? []).some(
      (identity) => identity.provider === "github",
    );
    if (installationId === null) {
      return Response.json({
        data: {
          githubIdentityConnected,
          installationConnected: false,
          repositories: [],
        },
      });
    }
    const repositories =
      await listGitHubInstallationRepositories(installationId);
    return Response.json({
      data: {
        githubIdentityConnected,
        installationConnected: true,
        repositories,
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "GitHub repositories could not be loaded",
        },
      },
      { status: 422 },
    );
  } finally {
    await database.close();
  }
}
