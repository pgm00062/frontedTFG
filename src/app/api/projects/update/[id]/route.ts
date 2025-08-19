import { NextRequest, NextResponse } from 'next/server'
import { updateProject } from '@/common/components/server_components/Project/infrastructure/projectOperations'

export async function PUT(
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
    
    // Validaciones básicas
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Nombre y descripción son obligatorios' },
        { status: 400 }
      )
    }

    const updatedProject = await updateProject(projectId, body)
    
    return NextResponse.json({ backendBody: updatedProject })
  } catch (error: any) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
