export type UserNameInterface = {
  firstName: string
  lastName: string
}

export type AddressInterface = {
  street: string
  city: string
  country: string
}

export type UserInterface = {
  userId: number
  username: string
  password: string
  fullName: UserNameInterface
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: AddressInterface
}
