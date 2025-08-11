'use client'
import { useState } from 'react'
import Sidebar from '../Delivery'
import ToggleButton from '../Delivery/components/ToggleButton'

export default function SidebarContainer() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ToggleButton onClick={() => setOpen(true)} />
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}


