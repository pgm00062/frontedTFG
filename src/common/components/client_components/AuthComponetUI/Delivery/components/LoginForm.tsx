'use client'

import { Form, Input, Button, Card, Typography, Alert } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import type { LoginFormProps } from '../interface'

const { Title } = Typography

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: { email: string; password: string }) => {
    onSubmit(values)
  }

  return (
    <Card className="auth-card">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          Iniciar Sesión
        </Title>
        <p style={{ color: '#666', margin: '8px 0 0 0' }}>
          Accede a tu cuenta
        </p>
      </div>

      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'El email es obligatorio' },
            { type: 'email', message: 'El email debe tener un formato válido' }
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="usuario@example.com"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: 'La contraseña es obligatoria' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="miContraseña123"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px', borderRadius: '8px' }}
          />
        )}

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={isLoading} className="btn-full-lg">
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default LoginForm