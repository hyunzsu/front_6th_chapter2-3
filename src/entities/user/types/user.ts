// 기본 사용자 타입
export interface User {
  id: number
  username: string
  image: string
}

export interface Address {
  address: string
  city: string
  state: string
  postalCode?: string
}

export interface Company {
  name: string
  title: string
  department?: string
}

export interface UserProfile extends User {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
}
