import { Router } from 'express'
import { userControllers } from './user.controller'

const router = Router()

router.post('/', userControllers.createUser)

export { router as userRouter }
