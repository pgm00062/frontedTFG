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


