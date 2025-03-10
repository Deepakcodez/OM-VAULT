interface UserDetailType {
  name: string
  email: string
  password: string
  phone: string
}

interface loginType {
  email: string
  password: string
}

export type { UserDetailType, loginType }
