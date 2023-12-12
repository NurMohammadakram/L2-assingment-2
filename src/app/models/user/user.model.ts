import { Schema, model } from 'mongoose'
import {
  AddressInterface,
  UserInterface,
  UserNameInterface,
} from './user.interface'

export const userNameSchema = new Schema<UserNameInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

export const addressSchema = new Schema<AddressInterface>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

export const userSchema = new Schema<UserInterface>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: userNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], default: [], required: true },
  address: { type: addressSchema, required: true },
})

export const UserModel = model<UserInterface>('User', userSchema)
