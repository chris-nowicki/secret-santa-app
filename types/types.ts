export interface SecretSantaContextType {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  setUser: (user: unknown) => void
}
