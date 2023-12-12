import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log(user);
    const userData = await userServices.createUserService(user);
    res.status(200).json({
      success: true,
      messege: 'User created successfully!',
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messege: 'error happend',
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const userData = await userServices.getAllUserService();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'can not find users',
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const singleUserData = await userServices.getUserByIdService(
      parseInt(userId),
    );
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: singleUserData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
};
