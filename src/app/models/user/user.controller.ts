import { Request, Response } from 'express';
import { userServices } from './user.service';
import {
  ordersValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
} from './user.validation';

// While creating a user into DB, handling request and response
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validData = userValidationSchema.parse(user);
    const userData = await userServices.createUserIntoDB(validData);

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

// While Getting all user from DB, handling request and response
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

// Getting a single user by id, handling request and response
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

// Updating a user by its id, handling request and response
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const validData = userUpdateValidationSchema.parse(data);
    const updatingInfo = await userServices.updateUserIntoDB(
      parseInt(userId),
      validData,
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

// Delete a user, handling reqest and reponse
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

// Adding products into orders
const addOrders = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    product.price = parseInt(product.price);
    product.quantity = parseInt(product.quantity);

    const validProduct = ordersValidationSchema.parse(product);
    const { userId } = req.params;

    const responseData = await userServices.addOrdersIntoDB(
      parseInt(userId),
      validProduct,
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

// Get all orders of a user
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

// Get total price of a user orders
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
