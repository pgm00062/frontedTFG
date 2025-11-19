'use client'
import { usePathname } from 'next/navigation'
import SidebarContainer from '@/common/components/client_components/SidebarUI/Delivery/components/SidebarContainer'
import ProfileButton from '@/common/components/client_components/ProfileButton/ProfileButton'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // Rutas donde NO debe aparecer el Sidebar ni el ProfileButton
  const authRoutes = ['/', '/register-login']
  const isAuthRoute = authRoutes.includes(pathname)

  return (
    <>
      {!isAuthRoute && (
        <>
          <SidebarContainer />
          <ProfileButton />
        </>
      )}
      {children}
    </>
  )
}
