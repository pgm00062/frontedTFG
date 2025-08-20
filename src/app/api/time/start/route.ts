import { NextRequest, NextResponse } from 'next/server';
import Service from '@/service/src';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');

    const response = await Service.getCases('startTime', {
      signal: new AbortController().signal,
      endPointData: body,
      token: authHeader || undefined,
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error en start time:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión de tiempo' },
      { status: 500 }
    );
  }
}
