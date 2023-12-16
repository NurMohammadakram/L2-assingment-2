import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  AddressInterface,
  UserInterface,
  UserNameInterface,
  UserStaticModel,
} from './user.interface';
import config from '../../config';

export const userNameSchema = new Schema<UserNameInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const addressSchema = new Schema<AddressInterface>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export const userSchema = new Schema<UserInterface, UserStaticModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: userNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], default: [], required: true },
  address: { type: addressSchema, required: true },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.post('find', async function (doc, next) {
  doc.password = '';
  next();
});
// userSchema.post('findOne', async function (doc, next) {
// doc.password = '';
//   next();
// });

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await UserModel.findOne({ userId });
  console.log(existingUser);
  return existingUser;
};

export const UserModel = model<UserInterface, UserStaticModel>(
  'User',
  userSchema,
);
