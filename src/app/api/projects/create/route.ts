import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Forward cookies from the incoming request headers (server-side)
    const cookieHeader = request.headers.get('cookie') || ''

    // parse cookies into an object
    const parseCookies = (c: string) =>
      c.split(';').map(s => s.trim()).filter(Boolean).reduce((acc: any, pair) => {
        const [k, ...v] = pair.split('=')
        acc[k] = decodeURIComponent(v.join('='))
        return acc
      }, {})

    const cookies = cookieHeader ? parseCookies(cookieHeader) : {}
    const authToken = cookies['AUTH_TOKEN'] || cookies['AuthToken'] || cookies['auth_token']
    const jsession = cookies['JSESSIONID']

    const forwardHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
    if (cookieHeader) forwardHeaders['Cookie'] = cookieHeader
    if (authToken) forwardHeaders['Authorization'] = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`

    const res = await fetch('http://localhost:8080/projects/create', {
      method: 'POST',
      headers: forwardHeaders,
      body: JSON.stringify(body),
    })

    const text = await res.text()
    const contentType = res.headers.get('content-type') || ''

    // Forward status and body; in case of error devolver detalle para debugging
    if (!res.ok) {
      try {
        const json = contentType.includes('application/json') ? JSON.parse(text) : { message: text }
        // include minimal info about forwarded auth/cookies for debugging (do not leak token value)
        const debugInfo = {
          backendStatus: res.status,
          backendBody: json,
          forwarded: {
            forwardedAuth: !!authToken,
            forwardedJSession: !!jsession,
          },
        }
        return NextResponse.json(debugInfo, { status: res.status })
      } catch (e) {
        return new NextResponse(text, { status: res.status })
      }
    }

    if (contentType.includes('application/json')) {
      return NextResponse.json(JSON.parse(text), { status: res.status })
    }

    return new NextResponse(text, { status: res.status })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error' }, { status: 500 })
  }
}
