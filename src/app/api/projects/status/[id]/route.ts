import { NextRequest, NextResponse } from 'next/server'
import { updateProjectStatus } from '@/common/components/server_components/Project/infrastructure/projectOperations'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id)
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'ID del proyecto inválido' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['EN_PROGRESO', 'TERMINADO', 'CANCELADO'].includes(status)) {
      return NextResponse.json(
        { error: 'Estado inválido. Debe ser: EN_PROGRESO, TERMINADO o CANCELADO' },
        { status: 400 }
      )
    }

    const updatedProject = await updateProjectStatus(projectId, status)
    
    return NextResponse.json({ backendBody: updatedProject })
  } catch (error: any) {
    console.error('Error updating project status:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
