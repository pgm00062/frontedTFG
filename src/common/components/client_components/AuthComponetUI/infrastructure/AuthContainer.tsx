'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Tabs, Typography, Space } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons'
import Service from '@/service/src'
import LoginForm from '../Delivery/components/LoginForm'
import RegisterForm from '../Delivery/components/RegisterForm'
import type { AuthContainerProps } from '../Delivery/interface'

const { Title, Paragraph } = Typography


const AuthContainer: React.FC<AuthContainerProps> = ({ initialMode = 'login' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState<string>('')

  // NOTE: login se realiza en el cliente y hace POST a `/api/auth/login` (BFF)
  // Esto es intencional para que el navegador pueda recibir la cookie de sesión
  // (Set-Cookie) desde el BFF como cookie first-party. Ver `docs/COMPONENTS.md`.
  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError('')
    
    try {
  // Llamar a nuestro BFF para capturar JSESSIONID como cookie first-party
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Error al iniciar sesión')
      }
      console.log('Login successful')
      router.push('/welcome')
      
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.body?.message || 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (data: {
    name: string
    surname: string
    email: string
    dni: string
    password: string
  }) => {
    setIsLoading(true)
    setError('')
    
    try {
      const signal = new AbortController().signal
      console.log('Sending register data:', data)
      const response = await Service.getCases('register', {
        signal,
        endPointData: data,
        token: undefined // No token needed for register
      })
      
      console.log('Register successful:', response)
      // Redirigir al login después del registro exitoso
      setTimeout(() => {
        router.push('/register-login')
      }, 1500) // Pequeño delay para mostrar el mensaje
      
    } catch (err: any) {
      console.error('Register error:', err)
      console.error('Error details:', {
        status: err.status,
        statusText: err.statusText,
        body: err.body,
        params: err.params
      })
      setError(err.body?.message || 'Error al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  const items = [
    {
      key: 'login',
      label: (
        <Space>
          <UserOutlined />
          Iniciar Sesión
        </Space>
      ),
      children: (
        <div className="auth-form-card">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        </div>
      ),
    },
    {
      key: 'register',
      label: (
        <Space>
          <UserAddOutlined />
          Registrarse
        </Space>
      ),
      children: (
        <div className="auth-form-card">
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
        </div>
      ),
    },
  ]

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-header">
          <Title level={1} className="auth-title">FreeManage</Title>
        </div>

        <Card className="auth-card">
          <Tabs
            defaultActiveKey={initialMode}
            items={items}
            size="large"
            className="auth-tabs"
          />
        </Card>
      </div>
    </div>
  )
}

export default AuthContainer
