import { NextRequest, NextResponse } from 'next/server'
import { deleteProject } from '@/common/components/server_components/Project/infrastructure/projectOperations'

export async function DELETE(
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

    await deleteProject(projectId)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Proyecto eliminado correctamente' 
    })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
