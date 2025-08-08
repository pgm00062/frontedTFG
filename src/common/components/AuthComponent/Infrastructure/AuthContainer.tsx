'use client'

import { useState } from 'react'
import { Card, Tabs, Typography, Space } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons'
import Service from '@/service/src'
import LoginForm from '../Delivery/LoginForm'
import RegisterForm from '../Delivery/RegisterForm'

const { Title, Paragraph } = Typography

interface AuthContainerProps {
  initialMode?: 'login' | 'register'
}

const AuthContainer: React.FC<AuthContainerProps> = ({ initialMode = 'login' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError('')
    
    try {
      const signal = new AbortController().signal
      console.log('Sending login data:', data)
      const response = await Service.getCases('login', {
        signal,
        endPointData: data,
        token: undefined // No token needed for login
      })
      
      console.log('Login successful:', response)
      // Aquí podrías redirigir al usuario o actualizar el estado global
      
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
      // Aquí podrías redirigir al usuario o actualizar el estado global
      
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
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
        />
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
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={isLoading}
          error={error}
        />
      ),
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1} style={{ 
            color: 'white', 
            margin: 0, 
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontSize: '2.5rem'
          }}>
            TFG Freelance
          </Title>
          <Paragraph style={{ 
            color: 'rgba(255,255,255,0.9)', 
            margin: '8px 0 0 0',
            fontSize: '1.1rem'
          }}>
            Conecta con los mejores profesionales
          </Paragraph>
        </div>

        {/* Auth Card */}
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <Tabs
            defaultActiveKey={initialMode}
            items={items}
            size="large"
            style={{ marginTop: '16px' }}
            tabBarStyle={{
              marginBottom: '24px',
              borderBottom: '1px solid #f0f0f0'
            }}
          />
        </Card>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '24px',
          color: 'rgba(255,255,255,0.8)'
        }}>
          <Paragraph style={{ margin: 0, fontSize: '0.9rem' }}>
            © 2024 TFG Freelance App. Todos los derechos reservados.
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
