'use client'
import { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Typography, Alert, Modal, Spin } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined, EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons'
import type { RegisterFormProps } from '../interface'

const { Title } = Typography

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const [form] = Form.useForm()
  const [showRedirectModal, setShowRedirectModal] = useState(false)
  const [wasLoading, setWasLoading] = useState(false)

  // Detectar cuando cambia de loading a no loading sin error (éxito)
  useEffect(() => {
    if (wasLoading && !isLoading && !error) {
      // Registro exitoso
      setShowRedirectModal(true)
    }
    setWasLoading(isLoading)
  }, [isLoading, error, wasLoading])

  const handleSubmit = (values: {
    name: string
    surname: string
    email: string
    dni: string
    password: string
  }) => {
    onSubmit(values)
  }

  return (
    <Card className="auth-card">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Title level={2} style={{ margin: 0, color: '#52c41a' }}>
          Registrarse
        </Title>
        <p style={{ color: '#666', margin: '8px 0 0 0' }}>
          Crea tu cuenta nueva
        </p>
      </div>

      <Form
        form={form}
        name="register"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            { required: true, message: 'El nombre es obligatorio' }
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Pablo"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Apellido"
          rules={[
            { required: true, message: 'El apellido es obligatorio' }
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="García"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'El email es obligatorio' },
            { type: 'email', message: 'El email no tiene un formato válido' }
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="pablo.garcia@example.com"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Form.Item
          name="dni"
          label="DNI"
          rules={[
            { required: true, message: 'El DNI es obligatorio' },
            { pattern: /^[0-9]{8}[A-Z]$/, message: 'El DNI debe tener 8 números y una letra' }
          ]}
        >
          <Input
            prefix={<IdcardOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="12345678Z"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: 'La contraseña es obligatoria' },
            { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="MiContraseña123"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirmar contraseña"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Por favor confirma tu contraseña' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Las contraseñas no coinciden'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="MiContraseña123"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        {error && (<Alert message={error} type="error" showIcon className="alert-spaced" />)}

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={isLoading} className="btn-full-lg btn-success">
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={showRedirectModal}
        footer={null}
        closable={false}
        centered
        width={360}
      >
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#52c41a' }} spin />} />
          <div style={{ marginTop: 24, fontSize: 16, fontWeight: 500, color: '#52c41a' }}>
            ¡Registro exitoso!
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: '#666' }}>
            Redirigiendo a inicio de sesión...
          </div>
        </div>
      </Modal>
    </Card>
  )
}
export default RegisterForm