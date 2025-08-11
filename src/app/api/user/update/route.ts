import { NextRequest, NextResponse } from 'next/server'
import Service from '@/service/src'

export async function PUT(req: NextRequest) {
  const abort = new AbortController()
  try {
    const body = await req.json()
    // Leer cookies
    const authToken = req.cookies.get('AUTH_TOKEN')?.value
    const jsession = req.cookies.get('JSESSIONID')?.value
    const headers = jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined

    const data = await Service.getCases('updateUser', {
      signal: abort.signal,
      endPointData: body,
      token: authToken,
      headers,
    })

    return NextResponse.json({ ok: true, data })
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || 'Update failed' }, { status: 500 })
  }
}


