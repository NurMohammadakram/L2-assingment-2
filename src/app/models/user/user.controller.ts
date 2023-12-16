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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      messege: err.message || 'some internal error happend',
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
      message: 'error happend: could not find users',
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
      message: err.message || 'error happend: something went wrong!',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const updatingInfo = await userServices.updateUserIntoDB(
      parseInt(userId),
      data,
    );
    const newData = await userServices.getUserByIdFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!' || updatingInfo,
      data: newData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const UserData = await userServices.deleteUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: UserData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'error happend: could not delete user',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const addOrders = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const { userId } = req.params;

    const responseData = await userServices.addOrdersIntoDB(
      parseInt(userId),
      product,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: responseData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const ordersData = await userServices.getOrdersFromDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: ordersData,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice = await userServices.getTotalPriceFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  addOrders,
  getOrders,
  getTotalPrice,
};
