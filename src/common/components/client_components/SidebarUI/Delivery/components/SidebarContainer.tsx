'use client'
import { useState } from 'react'
import Sidebar from '..'

export default function SidebarContainer() {
  const [open, setOpen] = useState(false)
  return (
    <>
      {/* El botón toggle se ha eliminado - ahora usamos menú horizontal */}
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}