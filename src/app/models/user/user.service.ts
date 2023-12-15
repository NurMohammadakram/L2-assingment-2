import { UserInterface } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: UserInterface) => {
  try {
    if (await UserModel.isUserExists(user.userId)) {
      throw new Error('User already exists');
    }
    const result = await UserModel.create(user);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getAllUserFromDB = async () => {
  try {
    const result = await UserModel.find(
      {},
      { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getUserByIdFromDB = async (userId: number) => {
  try {
    if (await UserModel.isUserExists(userId)) {
      throw new Error('User not found');
    }

    const result = await UserModel.findOne(
      { userId },
      {
        password: 0,
      },
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const updateUserIntoDB = async (userId: number) => {
  try {
    const data = await UserModel.updateOne({ userId }, {});
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
};
