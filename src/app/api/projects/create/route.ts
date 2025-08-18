import { NextResponse } from 'next/server'
import Service from '@/service/src'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Forward cookies from the incoming request headers (server-side)
    const cookieHeader = request.headers.get('cookie') || ''

    // parse cookies into an object
    const parseCookies = (c: string) =>
      c
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
        .reduce((acc: any, pair) => {
          const [k, ...v] = pair.split('=')
          acc[k] = decodeURIComponent(v.join('='))
          return acc
        }, {})

    const cookies = cookieHeader ? parseCookies(cookieHeader) : {}
    const authToken = cookies['AUTH_TOKEN'] || cookies['AuthToken'] || cookies['auth_token']
    const jsession = cookies['JSESSIONID']

    const authHeader = authToken ? (authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`) : undefined
    const forwardHeaders = jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined

    // Use Service to execute the create-project useCase.
    // Ajusta 'createProject' si tu useCase tiene otro nombre.
    const result = await Service.getCases('createProject', {
      endPointData: body,
      token: authHeader,
      headers: forwardHeaders,
    })

    return NextResponse.json(result)
  } catch (err: any) {
    console.error('/api/projects/create error', err)
    return NextResponse.json(
      { message: err?.message || 'Error interno', error: String(err) },
      { status: 500 }
    )
  }
}