export type UserProfile = {
  id: number
  name: string
  surname: string
  email: string
  dni: string
}

export interface ProfileClientProps {
  initialData: UserProfile | null
  errorMessage?: string
}

export interface EditableFieldRowProps {
  label: string
  name: string
  value: string | number | null | undefined
  icon?: React.ReactNode
  onChange: (name: string, value: string) => void
  type?: 'text' | 'email'
  disabled?: boolean
}

interface FieldRowProps {
  label: string
  value: string | number | null | undefined
  icon?: React.ReactNode
}
