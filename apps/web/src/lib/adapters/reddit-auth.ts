export async function redditAuth(opts: {
  username: string
  password: string
  clientId: string
  clientSecret: string
}): Promise<{ access_token: string; expires_in: number }> {
  const { username, password, clientId, clientSecret } = opts

  const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'SignalForge/1.0 by ' + username,
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Reddit API ${res.status}: ${text}`)
  }

  const data = await res.json() as { access_token?: string; error?: string; expires_in?: number }
  if (data.error || !data.access_token) {
    throw new Error(data.error ?? 'No access token returned')
  }

  return { access_token: data.access_token, expires_in: data.expires_in ?? 3600 }
}

export async function redditRequest(opts: {
  accessToken: string
  method?: string
  path: string
  body?: Record<string, string>
  userAgent: string
}): Promise<unknown> {
  const { accessToken, method = 'GET', path, body, userAgent } = opts

  const res = await fetch(`https://oauth.reddit.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': userAgent,
      ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    ...(body ? { body: new URLSearchParams(body) } : {}),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Reddit API ${res.status}: ${text}`)
  }

  return res.json()
}
