import { UserInterface } from './user.interface'
import { UserModel } from './user.model'

const createUserService = async (user: UserInterface) => {
  try {
    const result = await UserModel.create(user)
    return result
  } catch (err) {
    console.log(err)
  }
}

export const userServices = {
  createUserService,
}
