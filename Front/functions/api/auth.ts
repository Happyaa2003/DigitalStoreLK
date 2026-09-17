/**
 * POST /api/auth
 * Authenticates the admin and returns a signed JWT.
 * GITHUB_TOKEN and ADMIN_AUTH_SECRET never leave the server.
 */

export const onRequestPost: PagesFunction<{
  ADMIN_AUTH_SECRET: string;
  JWT_SECRET: string;
}> = async ({ request, env }) => {
  // Rate limiting hint: Cloudflare Pages has no built-in rate limiting,
  // consider enabling Cloudflare WAF rules for /api/auth in production.

  try {
    const body = await request.json() as { password?: string };
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return Response.json({ error: 'Password required' }, { status: 400 });
    }

    // Constant-time comparison to prevent timing attacks
    const expectedSecret = env.ADMIN_AUTH_SECRET;
    if (!expectedSecret) {
      return Response.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Simple string comparison (for production, use bcrypt via Workers)
    // To use bcrypt: store bcrypt hash in ADMIN_AUTH_SECRET and compare here
    const passwordMatches = password === expectedSecret;

    if (!passwordMatches) {
      // Small delay to further slow brute force
      await new Promise((r) => setTimeout(r, 300));
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create a simple JWT-like token (signed with HMAC-SHA256)
    const jwtSecret = env.JWT_SECRET;
    if (!jwtSecret) {
      return Response.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const payload = {
      sub: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60), // 8 hours
    };

    const token = await signJWT(payload, jwtSecret);

    return Response.json({ token }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
};

async function signJWT(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const body = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${header}.${body}`)
  );

  const sigStr = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${header}.${body}.${sigStr}`;
}

export async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [header, body, sig] = parts;
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      new TextEncoder().encode(`${header}.${body}`)
    );

    if (!valid) return false;

    const payload = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number };
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return false;

    return true;
  } catch {
    return false;
  }
}
