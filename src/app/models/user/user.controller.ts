import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userData = await userServices.createUserIntoDB(user);

    let withoutPassword;
    if (userData) {
      withoutPassword = {
        userId: userData.userId,
        username: userData.username,
        fullName: userData.fullName,
        age: userData.age,
        email: userData.email,
        isActive: userData.isActive,
        hobbies: userData.hobbies,
        address: userData.address,
      };
    }
    res.status(200).json({
      success: true,
      messege: 'User created successfully!',
      data: withoutPassword,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messege: 'error happend',
      error: err,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const userData = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'can not find users',
      error: err,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const UserData = await userServices.getUserByIdFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: UserData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found',
      error: err,
    });
  }
};
export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
};
