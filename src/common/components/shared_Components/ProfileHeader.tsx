'use client'
import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

interface ProfileHeaderProps {
  name: string
  surname: string
  email: string
}

export default function ProfileHeader({ name, surname, email }: ProfileHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/welcome')
  }

  return (
    <div className="profile-hero">
      <div className="profile-hero-left">
        <div className="profile-avatar">
          {name?.[0] ?? 'U'}
        </div>
        <div>
          <h2 className="profile-name">{name} {surname}</h2>
          <p className="profile-email">{email}</p>
        </div>
      </div>
      <div className="profile-actions">
        <Button 
          type="default" 
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          size="large"
        >
          Volver
        </Button>
      </div>
    </div>
  )
}