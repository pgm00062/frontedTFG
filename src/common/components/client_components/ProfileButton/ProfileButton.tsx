'use client'
import { UserOutlined, LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'

export default function ProfileButton() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    // Limpiar el localStorage o cookies si es necesario
    localStorage.removeItem('token')
    // Redirigir a la página de inicio (login/registro)
    router.push('/')
  }

  const handleProfile = () => {
    router.push('/profile')
  }

  // No mostrar el botón en la página de login/registro
  if (pathname === '/register-login') {
    return null
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Ver Perfil',
      icon: <UserSwitchOutlined />,
      onClick: handleProfile,
      style: { padding: '10px 16px' }
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Cerrar Sesión',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
      style: { padding: '10px 16px' }
    },
  ]

  return (
    <Dropdown 
      menu={{ items: menuItems }} 
      trigger={['click']}
      placement="bottomRight"
      overlayStyle={{
        minWidth: 180,
      }}
    >
      <button
        aria-label="Menú de perfil"
        className="profile-button"
        title="Mi Perfil"
      >
        <UserOutlined className="profile-button-icon" />
      </button>
    </Dropdown>
  )
}
