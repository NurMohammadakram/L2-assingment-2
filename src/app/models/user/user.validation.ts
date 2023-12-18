import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

export const ordersValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  age: z.number(),
  email: z.string().min(1).email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  isDeleted: z.boolean().optional(),
  orders: z.array(ordersValidationSchema).optional(),
});

export const userUpdateValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  age: z.number(),
  email: z.string().min(1).email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  isDeleted: z.boolean().optional(),
  orders: z.array(ordersValidationSchema).optional(),
});
