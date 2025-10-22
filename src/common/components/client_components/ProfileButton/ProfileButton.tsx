'use client'
import { UserOutlined } from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'

export default function ProfileButton() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    router.push('/profile')
  }

  // No mostrar el botón en la página de login/registro
  if (pathname === '/register-login') {
    return null
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Ir a mi perfil"
      className="profile-button"
      title="Mi Perfil"
    >
      <UserOutlined className="profile-button-icon" />
    </button>
  )
}
