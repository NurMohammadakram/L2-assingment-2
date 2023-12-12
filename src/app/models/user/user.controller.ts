import { Request, Response } from 'express'
import { userServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    console.log(user)
    const userData = await userServices.createUserService(user)
    res.status(200).json({
      success: true,
      messege: 'User created successfully!',
      data: userData,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      messege: 'error happend',
    })
  }
}

export const userControllers = {
  createUser,
}
