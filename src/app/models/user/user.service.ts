import { OrdersInterface, UserInterface } from './user.interface';
import { UserModel } from './user.model';

// Creating a user into DB using model and zod validation
const createUserIntoDB = async (user: UserInterface) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists');
  }
  const result = await UserModel.create(user);
  return result;
};

// Get all user from DB using user model
const getAllUserFromDB = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

// get a single user by it's id from DB
const getUserByIdFromDB = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOne(
      { userId },
      { password: 0, isDeleted: 0, orders: 0 },
    );
    return result;
  }
  throw new Error('User not found');
};

// updating a user using update zod validation and user model
const updateUserIntoDB = async (userId: number, data: UserInterface) => {
  if (await UserModel.isUserExists(userId)) {
    const updatingInfo = await UserModel.updateOne({ userId }, data);
    return updatingInfo;
  }
  throw new Error('User not found');
};

// Delete a user adding a isDeleted property true, and further filter the user with this property
const deleteUserFromDB = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const data = await UserModel.updateOne({ userId }, { isDeleted: true });
    return data;
  }
  throw new Error('User not found');
};

// Adding product into orders property into DB
const addOrdersIntoDB = async (userId: number, product: OrdersInterface) => {
  const user = await UserModel.isUserExists(userId);
  if (user) {
    user.orders?.push(product);
    const updatingInfo = await UserModel.updateOne({ userId }, user);
    return updatingInfo;
  }
  throw new Error('User not found');
};

// Get all orders of a user by its id from DB
const getOrdersFromDB = async (userId: number) => {
  const user = await UserModel.isUserExists(userId);
  if (user) {
    return user.orders;
  }
  throw new Error('User not found');
};

// Get total price of a user total orders from DB
const getTotalPriceFromDB = async (userId: number) => {
  const user = await UserModel.isUserExists(userId);
  if (user?.orders) {
    let total = 0;
    for (const product of user.orders) {
      total += product.price * product.quantity;
    }
    return total;
  }
  throw new Error('User not found');
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addOrdersIntoDB,
  getOrdersFromDB,
  getTotalPriceFromDB,
};
