import { UserInterface } from './user.interface';
import { UserModel } from './user.model';

const createUserService = async (user: UserInterface) => {
  try {
    const result = await UserModel.create(user);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getAllUserService = async () => {
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

export const userServices = {
  createUserService,
  getAllUserService,
};
