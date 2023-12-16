import { Model } from 'mongoose';

export type UserNameInterface = {
  firstName: string;
  lastName: string;
};

export type AddressInterface = {
  street: string;
  city: string;
  country: string;
};

export type OrdersInterface = {
  productName: string;
  price: number;
  quantity: number;
};

export type UserInterface = {
  userId: number;
  username: string;
  password: string;
  fullName: UserNameInterface;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: AddressInterface;
  isDeleted?: boolean;
  orders?: OrdersInterface[];
};

export interface UserStaticModel extends Model<UserInterface> {
  isUserExists(userId: number): Promise<UserInterface | null>;
}
