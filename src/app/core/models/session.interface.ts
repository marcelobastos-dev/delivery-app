export interface ISession {
  jwt: string
  user: IUser
}

export interface IUser {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}
