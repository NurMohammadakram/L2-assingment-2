import { Router } from 'express';
import { userControllers } from './user.controller';

const router = Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getUserById);

export { router as userRouter };
