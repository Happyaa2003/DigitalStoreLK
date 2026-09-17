/**
 * POST /api/github-commit
 * Commits a file to GitHub. Requires a valid admin JWT.
 * GITHUB_TOKEN never leaves the server.
 */

import { verifyJWT } from './auth';

interface CommitBody {
  path: string;
  content: string;
  message: string;
}

export const onRequestPost: PagesFunction<{
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH: string;
  JWT_SECRET: string;
}> = async ({ request, env }) => {
  // Verify JWT
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const isValid = await verifyJWT(token, env.JWT_SECRET);
  if (!isValid) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  // Parse request body
  let body: CommitBody;
  try {
    body = await request.json() as CommitBody;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { path, content, message } = body;

  if (!path || !content || !message) {
    return Response.json({ error: 'path, content and message are required' }, { status: 400 });
  }

  // Validate path — prevent directory traversal
  if (path.includes('..') || path.startsWith('/')) {
    return Response.json({ error: 'Invalid path' }, { status: 400 });
  }

  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } = env;
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return Response.json({ error: 'GitHub not configured' }, { status: 500 });
  }

  const branch = GITHUB_BRANCH || 'main';
  const apiBase = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'DigitalStoreLK-Admin/1.0',
  };

  // Get current file SHA (required for updates)
  let sha: string | undefined;
  try {
    const getRes = await fetch(`${apiBase}/contents/${path}?ref=${branch}`, { headers });
    if (getRes.ok) {
      const fileData = await getRes.json() as { sha?: string };
      sha = fileData.sha;
    }
  } catch {
    // File doesn't exist yet — that's fine for new files
  }

  // Encode content as base64
  const encoded = btoa(unescape(encodeURIComponent(content)));

  // Commit to GitHub
  const commitRes = await fetch(`${apiBase}/contents/${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message,
      content: encoded,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!commitRes.ok) {
    const err = await commitRes.json().catch(() => ({})) as { message?: string };
    return Response.json(
      { error: `GitHub API error: ${err.message ?? commitRes.statusText}` },
      { status: commitRes.status }
    );
  }

  const commitData = await commitRes.json() as { commit?: { sha?: string } };
  return Response.json({
    success: true,
    sha: commitData.commit?.sha,
    message: 'File committed successfully',
  });
};
