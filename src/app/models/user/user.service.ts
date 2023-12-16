import { UserInterface } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: UserInterface) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists');
  }
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const getUserByIdFromDB = async (userId: number) => {
  console.log('get user by id:', await UserModel.isUserExists(userId));
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOne({ userId }, { password: 0 });
    return result;
  }
  throw new Error('User not found');
};

const updateUserIntoDB = async (userId: number, data: UserInterface) => {
  if (await UserModel.isUserExists(userId)) {
    const newData = await UserModel.updateOne({ userId }, data);
    return newData;
  }
  throw new Error('User not found');
};

const deleteUserFromDB = async (userId: number) => {
  console.log('get user by id:', !(await UserModel.isUserExists(userId)));
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const data = await UserModel.updateOne({ userId }, { isDeleted: true });
  return data;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
