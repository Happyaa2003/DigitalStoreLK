/**
 * POST /api/upload-media
 * Uploads an image file to GitHub repository via multipart form data.
 * Requires a valid admin JWT. GITHUB_TOKEN never leaves the server.
 */

import { verifyJWT } from './auth';

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

  // Parse multipart form data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const path = formData.get('path') as string | null;

  if (!file || !path) {
    return Response.json({ error: 'file and path are required' }, { status: 400 });
  }

  // Validate file type
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json({ error: 'File type not allowed. Use PNG, JPG, JPEG, WEBP or SVG.' }, { status: 400 });
  }

  // Validate file size (5MB max)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return Response.json({ error: 'File size exceeds 5MB limit.' }, { status: 400 });
  }

  // Validate path
  if (path.includes('..') || path.startsWith('/')) {
    return Response.json({ error: 'Invalid path' }, { status: 400 });
  }

  // Block non-image paths (security)
  const allowedPathPrefixes = ['Front/public/assets/'];
  if (!allowedPathPrefixes.some((prefix) => path.startsWith(prefix))) {
    return Response.json({ error: 'Upload path not allowed' }, { status: 400 });
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

  // Get current file SHA if it exists
  let sha: string | undefined;
  try {
    const getRes = await fetch(`${apiBase}/contents/${path}?ref=${branch}`, { headers });
    if (getRes.ok) {
      const fileData = await getRes.json() as { sha?: string };
      sha = fileData.sha;
    }
  } catch {
    // New file
  }

  // Read file as ArrayBuffer and convert to base64
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  const base64Content = btoa(binary);

  // Commit to GitHub
  const commitRes = await fetch(`${apiBase}/contents/${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `media: upload ${file.name}`,
      content: base64Content,
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

  // Return the public URL of the file (relative path)
  const publicPath = path.replace('Front/public', '');
  return Response.json({
    success: true,
    url: publicPath,
    message: 'File uploaded successfully',
  });
};
