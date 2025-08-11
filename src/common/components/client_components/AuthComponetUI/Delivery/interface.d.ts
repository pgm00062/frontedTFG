export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  surname: string
  email: string
  dni: string
  password: string
}

export interface AuthClientProps {
  mode: 'login' | 'register'
  isLoading?: boolean
  error?: string
  onLogin: (data: { email: string; password: string }) => void
  onRegister: (data: { name: string; surname: string; email: string; dni: string; password: string }) => void
}

export interface AuthContainerProps {
  initialMode?: 'login' | 'register'
}

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void
  isLoading?: boolean
  error?: string
}

export interface RegisterFormProps {
  onSubmit: (data: {
    name: string
    surname: string
    email: string
    dni: string
    password: string
  }) => void
  isLoading?: boolean
  error?: string
}