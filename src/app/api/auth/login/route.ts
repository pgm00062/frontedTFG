import Service from '@/service/src'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const abort = new AbortController()
  try {
    const body = await req.json()
    console.log('body', body)
    const backendRes: any = await Service.getCases('login', {
      signal: abort.signal,
      endPointData: body,
      token: undefined,
    })

    // El método de dominio retorna { data, headers }
    const data = backendRes?.data ?? backendRes

    // Propagar sesión del backend guardando el JSESSIONID en cookie propia si existiera
    const setCookie = backendRes?.headers?.get?.('set-cookie') || ''
    const jsessionMatch = setCookie.match(/JSESSIONID=([^;]+)/)
    const jsessionId = jsessionMatch ? jsessionMatch[1] : null

    const res = NextResponse.json({ ok: true, data })
    if (jsessionId) {
      // Cookie first-party para nuestro dominio; el server la leerá y la reenviará al backend
      res.cookies.set('JSESSIONID', jsessionId, {
        httpOnly: true,
        secure: false, // en prod true con https
        sameSite: 'lax',
        path: '/',
      })
    }
    // Si backend devuelve token JWT en body, guardarlo en cookie httpOnly
    const maybeObj = data as any
    const token = maybeObj && typeof maybeObj === 'object' ? maybeObj.token : null
    if (token) {
      res.cookies.set('AUTH_TOKEN', token, {
        httpOnly: true,
        secure: false, // en prod true con https
        sameSite: 'lax',
        path: '/',
      })
    }
    return res
  } catch (error) {
    return NextResponse.json({ error: true, message: 'Login failed' }, { status: 500 })
  }
}