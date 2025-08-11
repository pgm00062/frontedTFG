import AuthServer from '@/common/components/server_components/AuthComponent/AuthContainer'

export default function RegisterLoginPage() {
  return (
    <div>
      <AuthServer initialMode="login" />
    </div>
  )
}


