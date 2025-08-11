'use client'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import type { AuthClientProps } from './interface'

const AuthClient: React.FC<AuthClientProps> = ({ mode, isLoading, error, onLogin, onRegister }) => {
  return (
    <div>
      {mode === 'login' ? (
        <LoginForm onSubmit={onLogin} isLoading={isLoading} error={error} />
      ) : (
        <RegisterForm onSubmit={onRegister} isLoading={isLoading} error={error} />
      )}
    </div>
  )
}

export default AuthClient